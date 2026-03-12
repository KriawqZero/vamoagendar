"use client";

import { useActionState, useRef, useState } from "react";
import { uploadLogoAction, removeLogoAction, type LogoState } from "@/lib/actions/logo.actions";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface LogoUploadProps {
  currentLogoUrl?: string | null;
}

const initialState: LogoState = {};

export function LogoUpload({ currentLogoUrl }: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, uploadAction, uploadPending] = useActionState(uploadLogoAction, initialState);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayUrl = uploadState.logoUrl || currentLogoUrl;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Arquivo muito grande. Máximo: 2MB.");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Tipo de arquivo inválido. Use JPG, PNG ou WebP.");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleRemove() {
    if (!confirm("Tem certeza que deseja remover o logo?")) return;
    
    setRemoveLoading(true);
    const result = await removeLogoAction();
    setRemoveLoading(false);

    if (result.error) {
      alert(result.error);
    } else {
      setPreviewUrl(null);
    }
  }

  return (
    <div className="space-y-4">
      {uploadState.error && (
        <div className="rounded-xl bg-red-900/20 p-3 text-sm text-red-400">
          {uploadState.error}
        </div>
      )}

      {uploadState.success && (
        <div className="rounded-xl bg-emerald-900/20 p-3 text-sm text-emerald-400">
          Logo atualizado com sucesso!
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          {previewUrl || displayUrl ? (
            <img
              src={previewUrl || displayUrl || ""}
              alt="Logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon size={32} className="text-zinc-600" />
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-1 flex-col gap-2">
          <form action={uploadAction}>
            <input
              ref={fileInputRef}
              type="file"
              name="logo"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadPending}
              >
                <Upload size={16} className="mr-2" />
                {displayUrl ? "Trocar logo" : "Enviar logo"}
              </Button>

              {previewUrl && (
                <Button type="submit" size="sm" loading={uploadPending}>
                  Salvar
                </Button>
              )}

              {displayUrl && !previewUrl && (
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={handleRemove}
                  loading={removeLoading}
                >
                  <X size={16} className="mr-2" />
                  Remover
                </Button>
              )}
            </div>
          </form>

          <p className="text-xs text-zinc-500">
            JPG, PNG ou WebP. Máximo 2MB.
          </p>
        </div>
      </div>
    </div>
  );
}
