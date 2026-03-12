"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleServiceAction, deleteServiceAction } from "@/lib/actions/service.actions";
import { ServiceForm } from "@/components/dashboard/service-form";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Pencil, Trash2, Plus } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  durationMinutes: number;
  active: boolean;
}

interface ServiceListProps {
  services: ServiceItem[];
  canCreate: boolean;
  planLimit: number;
}

export function ServiceList({ services, canCreate, planLimit }: ServiceListProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [editService, setEditService] = useState<ServiceItem | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Serviços</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {services.length}{planLimit < Infinity ? `/${planLimit}` : ""} serviços
          </p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowCreate(true)} size="sm">
            <Plus size={16} className="mr-1.5" />
            Novo
          </Button>
        )}
      </div>

      {!canCreate && services.length > 0 && (
        <div className="mb-4 rounded-xl bg-amber-900/20 p-3 text-sm text-amber-400">
          Limite de serviços atingido.{" "}
          <Link href="/dashboard/assinatura" className="font-medium underline hover:text-amber-300">
            Faça upgrade para o plano Pro
          </Link>{" "}
          para criar mais.
        </div>
      )}

      {services.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-800 py-16 text-center">
          <p className="mb-1 text-sm font-medium text-zinc-400">
            Nenhum serviço cadastrado
          </p>
          <p className="mb-4 text-xs text-zinc-600">
            Crie seu primeiro serviço para começar a receber agendamentos.
          </p>
          <Button onClick={() => setShowCreate(true)} size="sm">
            <Plus size={16} className="mr-1.5" />
            Criar serviço
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-zinc-100">
                    {service.name}
                  </p>
                  <Badge variant={service.active ? "success" : "default"}>
                    {service.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                  <Clock size={12} />
                  {service.durationMinutes} min
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleServiceAction(service.id)}
                  className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                >
                  {service.active ? "Desativar" : "Ativar"}
                </button>
                <button
                  onClick={() => setEditService(service)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Excluir este serviço?")) {
                      deleteServiceAction(service.id);
                    }
                  }}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-900/30 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create modal */}
      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Novo serviço"
      >
        <ServiceForm onSuccess={() => setShowCreate(false)} />
      </Modal>

      {/* Edit modal */}
      <Modal
        open={!!editService}
        onClose={() => setEditService(null)}
        title="Editar serviço"
      >
        {editService && (
          <ServiceForm
            service={editService}
            onSuccess={() => setEditService(null)}
          />
        )}
      </Modal>
    </div>
  );
}
