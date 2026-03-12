import { notFound } from "next/navigation";
import Link from "next/link";
import { userRepository } from "@/lib/repositories/user.repository";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { BookingWizard } from "@/components/booking/booking-wizard";
import type { Metadata } from "next";

interface BookingPageProps {
  params: Promise<{ customSlug: string }>;
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { customSlug } = await params;
  const user = await userRepository.findByCustomSlug(customSlug);
  if (!user) return { title: "Não encontrado" };
  return {
    title: `Agendar | ${user.businessName || user.name}`,
    description: `Agende seu horário com ${user.businessName || user.name}`,
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { customSlug } = await params;
  const user = await userRepository.findByCustomSlug(customSlug);
  if (!user) notFound();

  const services = await serviceRepository.findActiveByUserId(user.id);

  if (services.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-zinc-100">
            {user.businessName || user.name}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Nenhum serviço disponível no momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          {user.logoUrl && (
            <img
              src={user.logoUrl}
              alt={user.businessName || user.name}
              className="mx-auto mb-4 h-16 w-16 rounded-2xl object-cover"
            />
          )}
          <h1 className="text-xl font-bold text-zinc-100">
            {user.businessName || user.name}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Escolha um serviço e agende seu horário
          </p>
        </div>

        {/* Booking wizard */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <BookingWizard
            userId={user.id}
            services={services.map((s) => ({
              id: s.id,
              name: s.name,
              durationMinutes: s.durationMinutes,
            }))}
            accentColor={user.accentColor}
            businessName={user.businessName || user.name}
          />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-zinc-700">
          Agendamento por{" "}
          <Link href="/" className="text-zinc-500 hover:text-zinc-400">
            VamoAgendar
          </Link>
        </p>
      </div>
    </div>
  );
}
