"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  unable_to_create_user: "Não foi possível criar sua conta. Tente novamente ou use outro método de login.",
  email_already_in_use: "Este email já está em uso. Faça login com sua senha ou use a recuperação de senha.",
  invalid_credentials: "Credenciais inválidas. Tente novamente.",
  oauth_error: "Erro ao conectar com o Google. Tente novamente.",
  account_linking_failed: "Não foi possível vincular sua conta. Entre em contato com o suporte.",
  session_error: "Erro na sessão. Faça login novamente.",
  default: "Ocorreu um erro durante o login. Tente novamente.",
};

export function OAuthErrorBanner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [dismissed, setDismissed] = useState(false);

  if (!error || dismissed) return null;

  const errorMessage = ERROR_MESSAGES[error] || ERROR_MESSAGES.default;

  return (
    <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-100">Erro no login</h3>
          <p className="mt-1 text-sm text-red-200/80">{errorMessage}</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="rounded-lg p-1 text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
