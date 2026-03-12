"use client";

import { useState, useActionState } from "react";
import { submitBookingAction, fetchSlotsAction, type BookingState } from "@/lib/actions/booking.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, ChevronLeft, Check, CalendarDays } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  durationMinutes: number;
}

interface BookingWizardProps {
  userId: string;
  services: ServiceOption[];
  accentColor: string;
  businessName: string;
}

type Step = "service" | "date" | "time" | "contact" | "confirm" | "done";

const initialState: BookingState = {};

export function BookingWizard({ userId, services, accentColor, businessName }: BookingWizardProps) {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [state, formAction, pending] = useActionState(submitBookingAction, initialState);

  const handleServiceSelect = (service: ServiceOption) => {
    setSelectedService(service);
    setSelectedDate("");
    setSelectedTime("");
    setStep("date");
  };

  const handleDateSelect = async (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    setLoadingSlots(true);
    try {
      const available = await fetchSlotsAction(userId, selectedService!.id, date);
      setSlots(available);
    } catch {
      setSlots([]);
    }
    setLoadingSlots(false);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("contact");
  };

  const goBack = () => {
    if (step === "date") setStep("service");
    else if (step === "time") setStep("date");
    else if (step === "contact") setStep("time");
  };

  // Generate next 30 days for date selection
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDateLabel = (d: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.toDateString() === today.toDateString()) return "Hoje";
    if (d.toDateString() === tomorrow.toDateString()) return "Amanhã";
    return d.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" });
  };

  const toDateValue = (d: Date) => d.toISOString().split("T")[0];

  if (state.success) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <Check size={32} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-zinc-100">Agendamento confirmado!</h2>
        <p className="mt-2 text-sm text-zinc-400">
          {selectedService?.name} &middot; {new Date(selectedDate).toLocaleDateString("pt-BR")} às {selectedTime}
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          Você receberá uma confirmação por email, se informado.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6 flex gap-1">
        {["service", "date", "time", "contact"].map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              ["service", "date", "time", "contact"].indexOf(step) >= i
                ? "bg-violet-500"
                : "bg-zinc-800"
            }`}
            style={["service", "date", "time", "contact"].indexOf(step) >= i ? { backgroundColor: accentColor } : {}}
          />
        ))}
      </div>

      {/* Back button */}
      {step !== "service" && (
        <button
          onClick={goBack}
          className="mb-4 flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
        >
          <ChevronLeft size={16} />
          Voltar
        </button>
      )}

      {/* Step: Service */}
      {step === "service" && (
        <div>
          <h2 className="mb-1 text-lg font-semibold text-zinc-100">Escolha o serviço</h2>
          <p className="mb-4 text-sm text-zinc-500">Selecione o que deseja agendar</p>
          <div className="space-y-2">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left transition-colors hover:border-zinc-600 active:bg-zinc-800"
              >
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{service.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                    <Clock size={12} />
                    {service.durationMinutes} min
                  </p>
                </div>
                <ChevronLeft size={16} className="rotate-180 text-zinc-600" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Date */}
      {step === "date" && (
        <div>
          <h2 className="mb-1 text-lg font-semibold text-zinc-100">Escolha a data</h2>
          <p className="mb-4 text-sm text-zinc-500">{selectedService?.name}</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {dates.map((d) => (
              <button
                key={toDateValue(d)}
                onClick={() => handleDateSelect(toDateValue(d))}
                className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-center transition-colors hover:border-zinc-600 active:bg-zinc-800"
              >
                <span className="text-lg font-bold text-zinc-100">{d.getDate()}</span>
                <span className="text-xs text-zinc-500">{formatDateLabel(d)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Time */}
      {step === "time" && (
        <div>
          <h2 className="mb-1 text-lg font-semibold text-zinc-100">Escolha o horário</h2>
          <p className="mb-4 text-sm text-zinc-500">
            {selectedService?.name} &middot; {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR")}
          </p>
          {loadingSlots ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
            </div>
          ) : slots.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <CalendarDays size={32} className="mb-3 text-zinc-600" />
              <p className="text-sm text-zinc-500">Nenhum horário disponível nesta data.</p>
              <button
                onClick={() => setStep("date")}
                className="mt-3 text-sm font-medium text-violet-500 hover:text-violet-400"
              >
                Escolher outra data
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 active:bg-zinc-800"
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step: Contact */}
      {step === "contact" && (
        <div>
          <h2 className="mb-1 text-lg font-semibold text-zinc-100">Seus dados</h2>
          <p className="mb-4 text-sm text-zinc-500">
            {selectedService?.name} &middot;{" "}
            {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR")} às {selectedTime}
          </p>

          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="serviceId" value={selectedService?.id} />
            <input type="hidden" name="date" value={selectedDate} />
            <input type="hidden" name="time" value={selectedTime} />

            {state.error && (
              <div className="rounded-xl bg-red-900/20 p-3 text-sm text-red-400">
                {state.error}
              </div>
            )}

            <Input
              id="clientName"
              name="clientName"
              label="Seu nome"
              placeholder="João Silva"
              required
              error={state.fieldErrors?.clientName?.[0]}
            />

            <Input
              id="clientEmail"
              name="clientEmail"
              type="email"
              label="Email (opcional)"
              placeholder="seu@email.com"
              error={state.fieldErrors?.clientEmail?.[0]}
            />

            <Input
              id="clientPhone"
              name="clientPhone"
              type="tel"
              label="Telefone / WhatsApp (opcional)"
              placeholder="(11) 99999-9999"
            />

            <Button
              type="submit"
              size="lg"
              loading={pending}
              className="mt-2 w-full"
              style={{ backgroundColor: accentColor }}
            >
              Confirmar agendamento
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
