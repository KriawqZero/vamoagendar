"use client";

import { useState, useActionState } from "react";
import {
  createHolidayAction,
  deleteHolidayAction,
  createExceptionAction,
  deleteExceptionAction,
  type HolidayState,
} from "@/lib/actions/holiday.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, CalendarOff, AlertTriangle } from "lucide-react";

interface HolidayItem {
  id: string;
  date: Date;
  name: string;
}

interface ExceptionItem {
  id: string;
  date: Date;
  startTime: string | null;
  endTime: string | null;
  type: string;
}

interface HolidaysManagerProps {
  holidays: HolidayItem[];
  exceptions: ExceptionItem[];
}

const initialState: HolidayState = {};

export function HolidaysManager({ holidays, exceptions }: HolidaysManagerProps) {
  const [showHoliday, setShowHoliday] = useState(false);
  const [showException, setShowException] = useState(false);
  const [holidayState, holidayAction, holidayPending] = useActionState(createHolidayAction, initialState);
  const [exceptionState, exceptionAction, exceptionPending] = useActionState(createExceptionAction, initialState);

  return (
    <div className="space-y-8">
      {/* Holidays */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Feriados</h2>
          <Button size="sm" variant="secondary" onClick={() => setShowHoliday(true)}>
            <Plus size={14} className="mr-1.5" />
            Adicionar
          </Button>
        </div>

        {holidays.length === 0 ? (
          <p className="text-sm text-gray-400">Nenhum feriado cadastrado.</p>
        ) : (
          <div className="space-y-2">
            {holidays.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <CalendarOff size={16} className="text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{h.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(h.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteHolidayAction(h.id)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Exceptions */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Exceções</h2>
          <Button size="sm" variant="secondary" onClick={() => setShowException(true)}>
            <Plus size={14} className="mr-1.5" />
            Adicionar
          </Button>
        </div>

        {exceptions.length === 0 ? (
          <p className="text-sm text-gray-400">Nenhuma exceção cadastrada.</p>
        ) : (
          <div className="space-y-2">
            {exceptions.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(e.date).toLocaleDateString("pt-BR")}
                      </p>
                      <Badge variant={e.type === "UNAVAILABLE" ? "danger" : "warning"}>
                        {e.type === "UNAVAILABLE" ? "Indisponível" : "Horário especial"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">
                      {e.startTime && e.endTime
                        ? `${e.startTime} – ${e.endTime}`
                        : "Dia inteiro"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteExceptionAction(e.id)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Holiday modal */}
      <Modal open={showHoliday} onClose={() => setShowHoliday(false)} title="Adicionar feriado">
        <form action={holidayAction} className="flex flex-col gap-4">
          {holidayState.error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{holidayState.error}</div>
          )}
          <Input id="holiday-name" name="name" label="Nome" placeholder="Ex: Natal" required />
          <Input id="holiday-date" name="date" type="date" label="Data" required />
          <Button type="submit" loading={holidayPending} className="w-full">
            Adicionar
          </Button>
        </form>
      </Modal>

      {/* Exception modal */}
      <Modal open={showException} onClose={() => setShowException(false)} title="Adicionar exceção">
        <form action={exceptionAction} className="flex flex-col gap-4">
          {exceptionState.error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{exceptionState.error}</div>
          )}
          <Input id="exc-date" name="date" type="date" label="Data" required />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tipo</label>
            <select
              name="type"
              defaultValue="UNAVAILABLE"
              className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-violet-500 focus:outline-none"
            >
              <option value="UNAVAILABLE">Indisponível</option>
              <option value="OVERRIDE">Horário especial</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input id="exc-start" name="startTime" type="time" label="Início (opcional)" />
            <Input id="exc-end" name="endTime" type="time" label="Fim (opcional)" />
          </div>
          <p className="text-xs text-gray-400">
            Deixe horários vazios para bloquear o dia inteiro.
          </p>
          <Button type="submit" loading={exceptionPending} className="w-full">
            Adicionar
          </Button>
        </form>
      </Modal>
    </div>
  );
}
