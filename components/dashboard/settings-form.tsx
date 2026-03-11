"use client";

import { useActionState } from "react";
import {
  updateProfileAction,
  updateSlugAction,
  type SettingsState,
} from "@/lib/actions/settings.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";

interface SettingsFormProps {
  user: {
    name: string;
    businessName: string | null;
    logoUrl: string | null;
    accentColor: string;
    slug: string;
    plan: string;
    email: string;
  };
}

const initialState: SettingsState = {};

export function SettingsForm({ user }: SettingsFormProps) {
  const [profileState, profileAction, profilePending] = useActionState(updateProfileAction, initialState);
  const [slugState, slugAction, slugPending] = useActionState(updateSlugAction, initialState);
  const isPro = user.plan === "PRO";
  const bookingUrl = `vamoagendar.com/book/${user.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${bookingUrl}`);
  };

  return (
    <div className="space-y-8">
      {/* Booking link */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Seu link de agendamento</h2>
        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <span className="flex-1 truncate text-sm text-zinc-300">{bookingUrl}</span>
          <button
            onClick={copyLink}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            title="Copiar link"
          >
            <Copy size={16} />
          </button>
          <a
            href={`/book/${user.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            title="Abrir link"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* Plan info */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Plano</h2>
        <a
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
        </a>
      </section>

      {/* Slug */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Link personalizado</h2>
        {isPro ? (
          <form action={slugAction} className="space-y-4">
            {slugState.error && (
              <div className="rounded-xl bg-red-900/20 p-3 text-sm text-red-400">{slugState.error}</div>
            )}
            {slugState.success && (
              <div className="rounded-xl bg-emerald-900/20 p-3 text-sm text-emerald-400">Link atualizado!</div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500">vamoagendar.com/book/</span>
              <Input
                id="slug"
                name="slug"
                defaultValue={user.slug}
                placeholder="seu-negocio"
                className="flex-1"
              />
            </div>
            <Button type="submit" loading={slugPending} size="sm">
              Salvar link
            </Button>
          </form>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-sm text-zinc-400">
              Seu link atual: <span className="font-mono text-zinc-300">/book/{user.slug}</span>
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              <a href="/dashboard/assinatura" className="font-medium text-violet-500 hover:text-violet-400">
                Faça upgrade para o plano Pro
              </a>{" "}
              para personalizar seu link.
            </p>
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

          <Input
            id="settings-logoUrl"
            name="logoUrl"
            label="URL do logo (opcional)"
            defaultValue={user.logoUrl || ""}
            placeholder="https://exemplo.com/logo.png"
            error={profileState.fieldErrors?.logoUrl?.[0]}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="settings-accentColor" className="text-sm font-medium text-zinc-300">
              Cor de destaque
            </label>
            <div className="flex items-center gap-3">
              <input
                id="settings-accentColor"
                name="accentColor"
                type="color"
                defaultValue={user.accentColor}
                className="h-10 w-14 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900"
              />
              <span className="text-xs text-zinc-500">{user.accentColor}</span>
            </div>
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
