"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Scissors,
  Clock,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { logoutAction } from "@/lib/actions/auth.actions";
import { SidebarUpgradeCard } from "@/components/upsell/sidebar-upgrade-card";

const navItems = [
  { href: "/dashboard", label: "Agenda", icon: CalendarDays },
  { href: "/dashboard/services", label: "Serviços", icon: Scissors },
  { href: "/dashboard/availability", label: "Horários", icon: Clock },
  { href: "/dashboard/assinatura", label: "Assinatura", icon: CreditCard },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

interface SidebarProps {
  businessName?: string | null;
  plan?: string;
}

export function Sidebar({ businessName, plan }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const nav = (
    <>
      <div className="mb-8 px-3">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-lg font-bold text-zinc-100">
            {businessName || "VamoAgendar"}
          </h2>
          {plan === "PRO" && (
            <span className="rounded-md bg-violet-600/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-violet-400">
              Pro
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500">Painel do profissional</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-600/10 text-violet-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {plan === "FREE" && <SidebarUpgradeCard />}

      <form action={logoutAction} className="mt-auto">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
        >
          <LogOut size={18} />
          Sair
        </button>
      </form>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 lg:hidden">
        <h2 className="text-sm font-bold text-zinc-100">
          {businessName || "VamoAgendar"}
        </h2>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-64 flex-col bg-zinc-950 p-4 transition-transform lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 p-4 lg:sticky lg:top-0 lg:flex">
        {nav}
      </aside>
    </>
  );
}
