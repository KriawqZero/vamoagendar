"use client";

import { useState, useActionState } from "react";
import { saveScheduleAction, type AvailabilityState } from "@/lib/actions/availability.actions";
import { Button } from "@/components/ui/button";
import { WEEKDAY_NAMES } from "@/lib/utils/date";
import { Plus, Trash2 } from "lucide-react";

interface TimeBlock {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface ScheduleEditorProps {
  initialBlocks: TimeBlock[];
}

const initialState: AvailabilityState = {};

export function ScheduleEditor({ initialBlocks }: ScheduleEditorProps) {
  const [blocks, setBlocks] = useState<TimeBlock[]>(initialBlocks);
  const [state, formAction, pending] = useActionState(saveScheduleAction, initialState);

  const addBlock = (dayOfWeek: number) => {
    setBlocks([...blocks, { dayOfWeek, startTime: "09:00", endTime: "18:00" }]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, field: "startTime" | "endTime", value: string) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], [field]: value };
    setBlocks(updated);
  };

  const dayBlocks = (day: number) => blocks
    .map((b, i) => ({ ...b, originalIndex: i }))
    .filter((b) => b.dayOfWeek === day);

  return (
    <form action={formAction}>
      <input type="hidden" name="schedule" value={JSON.stringify(blocks)} />

      {state.error && (
        <div className="mb-4 rounded-xl bg-red-900/20 p-3 text-sm text-red-400">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="mb-4 rounded-xl bg-emerald-900/20 p-3 text-sm text-emerald-400">
          Horários salvos com sucesso!
        </div>
      )}

      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 0].map((day) => {
          const dBlocks = dayBlocks(day);
          return (
            <div key={day} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-200">
                  {WEEKDAY_NAMES[day]}
                </h3>
                <button
                  type="button"
                  onClick={() => addBlock(day)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-violet-400 hover:bg-violet-500/10"
                >
                  <Plus size={14} />
                  Horário
                </button>
              </div>

              {dBlocks.length === 0 ? (
                <p className="mt-2 text-xs text-zinc-600">Fechado</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {dBlocks.map((block) => (
                    <div key={block.originalIndex} className="flex items-center gap-2">
                      <input
                        type="time"
                        value={block.startTime}
                        onChange={(e) => updateBlock(block.originalIndex, "startTime", e.target.value)}
                        className="h-9 rounded-lg border border-zinc-700 bg-zinc-800 px-2 text-sm text-zinc-200 focus:border-violet-500 focus:outline-none"
                      />
                      <span className="text-xs text-zinc-500">até</span>
                      <input
                        type="time"
                        value={block.endTime}
                        onChange={(e) => updateBlock(block.originalIndex, "endTime", e.target.value)}
                        className="h-9 rounded-lg border border-zinc-700 bg-zinc-800 px-2 text-sm text-zinc-200 focus:border-violet-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeBlock(block.originalIndex)}
                        className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-900/30 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <Button type="submit" loading={pending} className="w-full sm:w-auto">
          Salvar horários
        </Button>
      </div>
    </form>
  );
}
