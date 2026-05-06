"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleServiceAction, deleteServiceAction } from "@/lib/actions/service.actions";
import { ServiceForm } from "@/components/dashboard/service-form";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Pencil, Trash2, Plus, Crown, CheckCircle2 } from "lucide-react";

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
  
  const isNearLimit = planLimit < Infinity && services.length === planLimit - 1;
  const isAtLimit = !canCreate && services.length > 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
          <p className="mt-1 text-sm text-gray-500">
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

      {isNearLimit && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-50 p-3 text-sm text-amber-700">
          Você está quase no limite ({services.length}/{planLimit} serviços).{" "}
          <Link href="/dashboard/assinatura" className="font-medium underline hover:text-amber-300">
            Seja Pro
          </Link>{" "}
          para ter serviços ilimitados.
        </div>
      )}

      {isAtLimit && (
        <div className="mb-4 rounded-xl border-2 border-violet-500/30 bg-violet-500/5 p-4">
          <div className="flex items-center gap-2">
            <Crown size={18} className="text-violet-400" />
            <p className="text-sm font-semibold text-gray-900">Limite de serviços atingido</p>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Com o plano Pro você tem acesso a:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "Serviços ilimitados",
              "Link personalizado",
              "Logo e cor da sua marca",
              "Lembretes por WhatsApp",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={14} className="text-emerald-400" />
                {benefit}
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard/assinatura"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Crown size={16} />
            Fazer upgrade — Plus R$ 9,90/mês ou Pro R$ 14,90/mês
          </Link>
        </div>
      )}

      {services.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <p className="mb-1 text-sm font-medium text-gray-500">
            Nenhum serviço cadastrado
          </p>
          <p className="mb-4 text-xs text-gray-400">
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
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {service.name}
                  </p>
                  <Badge variant={service.active ? "success" : "default"}>
                    {service.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {service.durationMinutes} min
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleServiceAction(service.id)}
                  className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  {service.active ? "Desativar" : "Ativar"}
                </button>
                <button
                  onClick={() => setEditService(service)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Excluir este serviço?")) {
                      deleteServiceAction(service.id);
                    }
                  }}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
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
