"use client";

import { useActionState, useEffect } from "react";
import {
  createServiceAction,
  updateServiceAction,
  type ServiceState,
} from "@/lib/actions/service.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ServiceFormProps {
  service?: {
    id: string;
    name: string;
    durationMinutes: number;
  };
  onSuccess?: () => void;
}

const initialState: ServiceState = {};

export function ServiceForm({ service, onSuccess }: ServiceFormProps) {
  const action = service ? updateServiceAction : createServiceAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {service && <input type="hidden" name="id" value={service.id} />}

      {state.error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </div>
      )}

      <Input
        id="name"
        name="name"
        label="Nome do serviço"
        placeholder="Ex: Consulta, Corte, Sessão"
        defaultValue={service?.name}
        required
        error={state.fieldErrors?.name?.[0]}
      />

      <Input
        id="durationMinutes"
        name="durationMinutes"
        type="number"
        label="Duração (minutos)"
        placeholder="30"
        min={5}
        max={480}
        defaultValue={service?.durationMinutes}
        required
        error={state.fieldErrors?.durationMinutes?.[0]}
      />

      <Button type="submit" loading={pending} className="w-full">
        {service ? "Salvar" : "Criar serviço"}
      </Button>
    </form>
  );
}
