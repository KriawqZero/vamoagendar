"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  updateProfileAction,
  updateCustomSlugAction,
  type SettingsState,
} from "@/lib/actions/settings.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Lock, Crown } from "lucide-react";

interface SettingsFormProps {
  user: {
    name: string;
    businessName: string | null;
    logoUrl: string | null;
    accentColor: string;
    bookingCode: string;
    customSlug: string | null;
    slugChangedAt: string | null;
    plan: string;
    email: string;
  };
}

const initialState: SettingsState = {};

function getDaysUntilNextChange(slugChangedAt: string | null): number | null {
  if (!slugChangedAt) return null;
  const changedDate = new Date(slugChangedAt);
  const daysSince = Math.floor((Date.now() - changedDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSince >= 7) return null;
  return 7 - daysSince;
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [profileState, profileAction, profilePending] = useActionState(updateProfileAction, initialState);
  const [customSlugState, customSlugAction, customSlugPending] = useActionState(updateCustomSlugAction, initialState);
  const isPro = user.plan === "PRO";
  const autoBookingUrl = `vamoagendar.com.br/a/${user.bookingCode}`;
  const customBookingUrl = user.customSlug ? `vamoagendar.com.br/${user.customSlug}` : null;
  const daysUntilChange = getDaysUntilNextChange(user.slugChangedAt);

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
  };

  return (
    <div className="space-y-8">
      {/* Automatic booking link */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Link de agendamento automático</h2>
        <p className="mb-3 text-sm text-zinc-500">
          Este é seu link permanente, gerado automaticamente. Sempre funcionará.
        </p>
        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <span className="flex-1 truncate text-sm text-zinc-300">{autoBookingUrl}</span>
          <button
            onClick={() => copyLink(autoBookingUrl)}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            title="Copiar link"
          >
            <Copy size={16} />
          </button>
          <Link
            href={`/a/${user.bookingCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            title="Abrir link"
          >
            <ExternalLink size={16} />
          </Link>
        </div>
      </section>

      {/* Plan info */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Plano</h2>
        <Link
          href="/dashboard/assinatura"
          className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 transition-colors hover:border-zinc-700"
        >
          <div className="flex items-center gap-3">
            <Badge variant={isPro ? "success" : "default"}>
              {isPro ? "Pro" : "Gratuito"}
            </Badge>
            <span className="text-sm text-zinc-400">
              {isPro ? "Todos os recursos disponíveis" : "Até 2 serviços, link automático"}
            </span>
          </div>
          <span className="text-sm text-violet-500">
            {isPro ? "Gerenciar" : "Fazer upgrade"}
          </span>
        </Link>
      </section>

      {/* Custom slug (PRO only) */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold text-zinc-100">Link personalizado</h2>
          {isPro && <Badge variant="success"><Crown size={12} className="mr-1" />Pro</Badge>}
        </div>
        {isPro ? (
          <div className="space-y-4">
            <p className="text-sm text-zinc-500">
              Personalize seu link para algo memorável. Você pode alterar a cada 7 dias.
            </p>
            {customBookingUrl && (
              <div className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/5 px-4 py-3">
                <span className="flex-1 truncate text-sm text-zinc-300">{customBookingUrl}</span>
                <button
                  onClick={() => copyLink(customBookingUrl)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                  title="Copiar link"
                >
                  <Copy size={16} />
                </button>
                <Link
                  href={`/${user.customSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                  title="Abrir link"
                >
                  <ExternalLink size={16} />
                </Link>
              </div>
            )}
            <form action={customSlugAction} className="space-y-4">
              {customSlugState.error && (
                <div className="rounded-xl bg-red-900/20 p-3 text-sm text-red-400">{customSlugState.error}</div>
              )}
              {customSlugState.success && (
                <div className="rounded-xl bg-emerald-900/20 p-3 text-sm text-emerald-400">Link personalizado atualizado!</div>
              )}
              {daysUntilChange !== null && (
                <div className="rounded-xl bg-amber-900/20 p-3 text-sm text-amber-400">
                  Você poderá alterar novamente em {daysUntilChange} dia{daysUntilChange > 1 ? "s" : ""}.
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">vamoagendar.com.br/</span>
                <Input
                  id="customSlug"
                  name="customSlug"
                  defaultValue={user.customSlug || ""}
                  placeholder="seu-negocio"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-zinc-600">
                Use 3-32 caracteres: letras, números e hifens. Links como &quot;login&quot;, &quot;dashboard&quot; são reservados.
              </p>
              <Button type="submit" loading={customSlugPending} size="sm" disabled={daysUntilChange !== null}>
                Salvar link personalizado
              </Button>
            </form>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Lock size={16} />
              <p className="text-sm">Link personalizado disponível no plano Pro</p>
            </div>
            <p className="mt-2 text-xs text-zinc-600">
              Com o plano Pro, você pode ter um link como <span className="font-mono text-zinc-500">vamoagendar.com.br/seu-negocio</span>
            </p>
            <Link
              href="/dashboard/assinatura"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-violet-500 hover:text-violet-400"
            >
              <Crown size={14} />
              Fazer upgrade para Pro
            </Link>
          </div>
        )}
      </section>

      {/* Profile */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Perfil</h2>
        <form action={profileAction} className="space-y-4">
          {profileState.error && (
            <div className="rounded-xl bg-red-900/20 p-3 text-sm text-red-400">{profileState.error}</div>
          )}
          {profileState.success && (
            <div className="rounded-xl bg-emerald-900/20 p-3 text-sm text-emerald-400">Perfil atualizado!</div>
          )}

          <Input
            id="settings-name"
            name="name"
            label="Seu nome"
            defaultValue={user.name}
            required
            error={profileState.fieldErrors?.name?.[0]}
          />

          <Input
            id="settings-businessName"
            name="businessName"
            label="Nome do negócio"
            defaultValue={user.businessName || ""}
            required
            error={profileState.fieldErrors?.businessName?.[0]}
          />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label htmlFor="settings-logoUrl" className="text-sm font-medium text-zinc-300">
                URL do logo (opcional)
              </label>
              {!isPro && <Badge variant="default" className="text-[10px]"><Lock size={10} className="mr-1" />Pro</Badge>}
            </div>
            <Input
              id="settings-logoUrl"
              name="logoUrl"
              defaultValue={user.logoUrl || ""}
              placeholder="https://exemplo.com/logo.png"
              error={profileState.fieldErrors?.logoUrl?.[0]}
              disabled={!isPro}
            />
            {!isPro && (
              <p className="text-xs text-zinc-600">Disponível no plano Pro</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <label htmlFor="settings-accentColor" className="text-sm font-medium text-zinc-300">
                Cor de destaque
              </label>
              {!isPro && <Badge variant="default" className="text-[10px]"><Lock size={10} className="mr-1" />Pro</Badge>}
            </div>
            <div className="flex items-center gap-3">
              <input
                id="settings-accentColor"
                name="accentColor"
                type="color"
                defaultValue={user.accentColor}
                className="h-10 w-14 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isPro}
              />
              <span className="text-xs text-zinc-500">{user.accentColor}</span>
            </div>
            {!isPro && (
              <p className="text-xs text-zinc-600">Disponível no plano Pro</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <p className="mt-1 text-sm text-zinc-500">{user.email}</p>
          </div>

          <Button type="submit" loading={profilePending}>
            Salvar perfil
          </Button>
        </form>
      </section>
    </div>
  );
}
