import { formatTimeBR } from "@/lib/utils/date";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Phone, Mail } from "lucide-react";

interface AppointmentCardProps {
  clientName: string;
  clientEmail?: string | null;
  clientPhone?: string | null;
  serviceName: string;
  startTime: Date;
  endTime: Date;
  status: string;
  isNext?: boolean;
}

export function AppointmentCard({
  clientName,
  clientEmail,
  clientPhone,
  serviceName,
  startTime,
  endTime,
  status,
  isNext,
}: AppointmentCardProps) {
  const statusVariant =
    status === "CONFIRMED"
      ? "success"
      : status === "CANCELLED"
        ? "danger"
        : "default";

  const statusLabel =
    status === "CONFIRMED"
      ? "Confirmado"
      : status === "CANCELLED"
        ? "Cancelado"
        : "Concluído";

  return (
    <div
      className={`rounded-2xl border p-4 transition-colors ${
        isNext
          ? "border-violet-500/50 bg-violet-500/5"
          : "border-zinc-800 bg-zinc-900"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-zinc-100">
              {clientName}
            </p>
            {isNext && (
              <Badge variant="success">Próximo</Badge>
            )}
          </div>
          <p className="mt-0.5 text-sm text-violet-400">{serviceName}</p>
        </div>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {formatTimeBR(startTime)} – {formatTimeBR(endTime)}
        </span>
        {clientPhone && (
          <span className="flex items-center gap-1">
            <Phone size={12} />
            {clientPhone}
          </span>
        )}
        {clientEmail && (
          <span className="flex items-center gap-1">
            <Mail size={12} />
            {clientEmail}
          </span>
        )}
      </div>
    </div>
  );
}
