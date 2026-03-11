import { workingHoursRepository } from "@/lib/repositories/working-hours.repository";
import { exceptionRepository } from "@/lib/repositories/exception.repository";
import { holidayRepository } from "@/lib/repositories/holiday.repository";
import { appointmentRepository } from "@/lib/repositories/appointment.repository";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { timeToMinutes, minutesToTime } from "@/lib/utils/date";
import { startOfDay } from "date-fns";

interface TimeBlock {
  startMinutes: number;
  endMinutes: number;
}

function subtractBlock(blocks: TimeBlock[], remove: TimeBlock): TimeBlock[] {
  const result: TimeBlock[] = [];
  for (const block of blocks) {
    if (remove.endMinutes <= block.startMinutes || remove.startMinutes >= block.endMinutes) {
      result.push(block);
    } else {
      if (block.startMinutes < remove.startMinutes) {
        result.push({ startMinutes: block.startMinutes, endMinutes: remove.startMinutes });
      }
      if (block.endMinutes > remove.endMinutes) {
        result.push({ startMinutes: remove.endMinutes, endMinutes: block.endMinutes });
      }
    }
  }
  return result;
}

export async function getAvailableSlots(
  userId: string,
  serviceId: string,
  date: Date
): Promise<string[]> {
  const dateOnly = startOfDay(date);

  // 1. Check holiday
  const holiday = await holidayRepository.findByUserIdAndDate(userId, dateOnly);
  if (holiday) return [];

  // 2. Get day of week
  const dayOfWeek = date.getDay();

  // 3. Get working hours for this day
  const workingHours = await workingHoursRepository.findByUserIdAndDay(userId, dayOfWeek);

  // 4. Check exceptions
  const exceptions = await exceptionRepository.findByUserIdAndDate(userId, dateOnly);

  let timeBlocks: TimeBlock[] = [];

  // Check for OVERRIDE exceptions first — they replace working hours
  const overrides = exceptions.filter((e) => e.type === "OVERRIDE");
  if (overrides.length > 0) {
    timeBlocks = overrides
      .filter((e) => e.startTime && e.endTime)
      .map((e) => ({
        startMinutes: timeToMinutes(e.startTime!),
        endMinutes: timeToMinutes(e.endTime!),
      }));
  } else {
    timeBlocks = workingHours.map((wh) => ({
      startMinutes: timeToMinutes(wh.startTime),
      endMinutes: timeToMinutes(wh.endTime),
    }));
  }

  if (timeBlocks.length === 0) return [];

  // Apply UNAVAILABLE exceptions
  const unavailable = exceptions.filter((e) => e.type === "UNAVAILABLE");
  for (const exc of unavailable) {
    if (!exc.startTime && !exc.endTime) {
      // Entire day off
      return [];
    }
    if (exc.startTime && exc.endTime) {
      const removeBlock: TimeBlock = {
        startMinutes: timeToMinutes(exc.startTime),
        endMinutes: timeToMinutes(exc.endTime),
      };
      timeBlocks = subtractBlock(timeBlocks, removeBlock);
    }
  }

  if (timeBlocks.length === 0) return [];

  // 5. Get service duration
  const service = await serviceRepository.findById(serviceId);
  if (!service) return [];
  const duration = service.durationMinutes;

  // 6. Generate candidate slots at 15-min intervals
  const INTERVAL = 15;
  const candidates: number[] = [];
  for (const block of timeBlocks) {
    let slot = block.startMinutes;
    while (slot + duration <= block.endMinutes) {
      candidates.push(slot);
      slot += INTERVAL;
    }
  }

  // 7. Get existing appointments for the date
  const appointments = await appointmentRepository.findByUserIdAndDate(userId, date);
  const bookedBlocks: TimeBlock[] = appointments.map((apt) => ({
    startMinutes: apt.startTime.getHours() * 60 + apt.startTime.getMinutes(),
    endMinutes: apt.endTime.getHours() * 60 + apt.endTime.getMinutes(),
  }));

  // 8. Filter out overlapping slots
  const available = candidates.filter((slotStart) => {
    const slotEnd = slotStart + duration;
    return !bookedBlocks.some(
      (booked) => slotStart < booked.endMinutes && slotEnd > booked.startMinutes
    );
  });

  // 9. Filter out past slots if date is today
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const filtered = isToday
    ? available.filter((slot) => slot > now.getHours() * 60 + now.getMinutes())
    : available;

  // 10. Return as time strings
  return filtered.map(minutesToTime);
}
