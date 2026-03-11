import {
  format,
  parse,
  addMinutes,
  isBefore,
  isEqual,
  startOfDay,
  endOfDay,
  isToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function parseTime(time: string): { hours: number; minutes: number } {
  const [hours, minutes] = time.split(":").map(Number);
  return { hours, minutes };
}

export function timeToMinutes(time: string): number {
  const { hours, minutes } = parseTime(time);
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function formatDateBR(date: Date): string {
  return format(date, "dd/MM/yyyy", { locale: ptBR });
}

export function formatTimeBR(date: Date): string {
  return format(date, "HH:mm", { locale: ptBR });
}

export function formatWeekdayBR(date: Date): string {
  return format(date, "EEEE", { locale: ptBR });
}

export function formatDateTimeBR(date: Date): string {
  return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function combineDateAndTime(date: Date, time: string): Date {
  const { hours, minutes } = parseTime(time);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

export const WEEKDAY_NAMES: Record<number, string> = {
  0: "Domingo",
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
};

export { format, parse, addMinutes, isBefore, isEqual, startOfDay, endOfDay, isToday };
