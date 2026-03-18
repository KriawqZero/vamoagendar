import Link from "next/link";
import { ArrowLeft, CreditCard, Calendar, XCircle, Shield, HelpCircle } from "lucide-react";
import type { Metadata } from "next";
import { BrandLink } from "@/components/brand/brand";

export const metadata: Metadata = {
  title: "Faturamento e Políticas | VamoAgendar",
  description: "Entenda como funciona o faturamento, cancelamento e políticas do VamoAgendar.",
};

export default function FaturamentoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Nav */}
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <BrandLink href="/" className="inline-flex items-center" aria-label="VamoAgendar" />
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-700"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/planos"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300"
          >
            <ArrowLeft size={14} />
            Voltar para planos
          </Link>

          {/* Header */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Faturamento e Políticas
            </h1>
            <p className="mt-4 text-base text-zinc-500">
              Tudo o que você precisa saber sobre pagamentos, cancelamentos e políticas do VamoAgendar.
            </p>
          </div>

          {/* Sections */}
          <div className="mt-12 space-y-8">
            {/* Como funciona o pagamento */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                  <CreditCard size={20} className="text-violet-400" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">Como funciona o pagamento</h2>
              </div>
              <div className="mt-4 space-y-3 text-sm text-zinc-400">
                <p>
                  O VamoAgendar utiliza o <span className="font-medium text-zinc-300">Mercado Pago</span> como processador de pagamentos, garantindo segurança e praticidade.
                </p>
                <div className="rounded-xl bg-zinc-950/50 p-4">
                  <p className="mb-2 font-medium text-zinc-300">Métodos aceitos:</p>
                  <ul className="space-y-1.5 text-zinc-500">
                    <li>• Cartão de crédito (aprovação instantânea)</li>
                    <li>• PIX (aprovação instantânea)</li>
                    <li>• Boleto bancário (aprovação em até 2 dias úteis)</li>
                  </ul>
                </div>
                <p>
                  Todos os pagamentos são processados de forma segura através do ambiente do Mercado Pago. <span className="font-medium text-zinc-300">Não armazenamos dados de cartão</span> em nossos servidores.
                </p>
              </div>
            </section>

            {/* Modelo de cobrança */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Calendar size={20} className="text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">Modelo de cobrança</h2>
              </div>
              <div className="mt-4 space-y-3 text-sm text-zinc-400">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="font-medium text-amber-400">⚠️ Importante: Pagamento único (não recorrente)</p>
                  <p className="mt-2 text-amber-400/80">
                    Atualmente, o VamoAgendar opera com <span className="font-semibold">pagamento único por período de 30 dias</span>. Não há cobrança automática recorrente.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-zinc-300">Como funciona:</p>
                  <ol className="space-y-2 text-zinc-500">
                    <li>1. Você realiza o pagamento de R$ 9,90</li>
                    <li>2. Seu plano é ativado imediatamente após confirmação do pagamento</li>
                    <li>3. Você tem acesso ao plano Pro por 30 dias corridos</li>
                    <li>4. Após 30 dias, seu plano volta automaticamente para o gratuito</li>
                    <li>5. Para continuar Pro, basta realizar um novo pagamento</li>
                  </ol>
                </div>
                <div className="rounded-xl bg-zinc-950/50 p-4">
                  <p className="font-medium text-zinc-300">Vantagens deste modelo:</p>
                  <ul className="mt-2 space-y-1.5 text-zinc-500">
                    <li>✓ Sem surpresas na fatura do cartão</li>
                    <li>✓ Você controla quando pagar</li>
                    <li>✓ Sem necessidade de cancelamento formal</li>
                    <li>✓ Flexibilidade total</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cancelamento */}
            <section id="cancelamento" className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                  <XCircle size={20} className="text-red-400" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">Cancelamento</h2>
              </div>
              <div className="mt-4 space-y-3 text-sm text-zinc-400">
                <p>
                  Você pode cancelar sua assinatura Pro a qualquer momento através do painel de controle em <span className="font-medium text-zinc-300">Dashboard → Assinatura</span>.
                </p>
                <div className="rounded-xl bg-zinc-950/50 p-4">
                  <p className="mb-2 font-medium text-zinc-300">O que acontece ao cancelar:</p>
                  <ul className="space-y-1.5 text-zinc-500">
                    <li>• Seu plano volta imediatamente para o gratuito</li>
                    <li>• Você perde acesso aos recursos Pro na hora</li>
                    <li>• Serviços além do limite (2) ficam inativos</li>
                    <li>• Link personalizado é desativado</li>
                    <li>• Logo e cor personalizada são removidos</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="font-medium text-red-400">Política de reembolso</p>
                  <p className="mt-2 text-red-400/80">
                    Não há reembolso para cancelamentos. O tempo restante do período de 30 dias é perdido ao cancelar.
                  </p>
                </div>
                <p className="text-zinc-500">
                  <span className="font-medium text-zinc-400">Dica:</span> Se você não deseja renovar, simplesmente não realize um novo pagamento após os 30 dias. Seu plano voltará automaticamente para o gratuito sem necessidade de cancelamento.
                </p>
              </div>
            </section>

            {/* Segurança e privacidade */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <Shield size={20} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">Segurança e privacidade</h2>
              </div>
              <div className="mt-4 space-y-3 text-sm text-zinc-400">
                <p>
                  Levamos a segurança dos seus dados a sério. Todas as transações são processadas através do Mercado Pago, que possui certificação PCI DSS nível 1.
                </p>
                <div className="rounded-xl bg-zinc-950/50 p-4">
                  <p className="mb-2 font-medium text-zinc-300">Garantias de segurança:</p>
                  <ul className="space-y-1.5 text-zinc-500">
                    <li>✓ Criptografia SSL/TLS em todas as comunicações</li>
                    <li>✓ Não armazenamos dados de cartão de crédito</li>
                    <li>✓ Conformidade com LGPD (Lei Geral de Proteção de Dados)</li>
                    <li>✓ Autenticação segura via Better Auth</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Perguntas frequentes */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-700/50">
                  <HelpCircle size={20} className="text-zinc-400" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">Perguntas frequentes</h2>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                  <p className="font-medium text-zinc-300">Posso mudar de plano a qualquer momento?</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Sim. Você pode fazer upgrade do plano gratuito para o Pro a qualquer momento. Para voltar ao gratuito, basta cancelar a assinatura.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                  <p className="font-medium text-zinc-300">O que acontece com meus dados se eu cancelar?</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Todos os seus dados (clientes, agendamentos, serviços) são mantidos. Apenas os recursos Pro são desativados. Você pode reativar o plano Pro a qualquer momento.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                  <p className="font-medium text-zinc-300">Posso usar o mesmo método de pagamento para renovar?</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Sim. Ao renovar, você pode escolher qualquer método de pagamento disponível (cartão, PIX ou boleto).
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                  <p className="font-medium text-zinc-300">Recebo nota fiscal?</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Sim. A nota fiscal é emitida automaticamente pelo Mercado Pago e enviada para o e-mail cadastrado após a confirmação do pagamento.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                  <p className="font-medium text-zinc-300">Haverá cobrança recorrente no futuro?</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Estamos avaliando implementar assinatura recorrente opcional no futuro. Caso isso aconteça, você será notificado e poderá escolher entre o modelo atual (pagamento único) ou recorrente.
                  </p>
                </div>
              </div>
            </section>

            {/* Suporte */}
            <section className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6 text-center">
              <h3 className="text-lg font-semibold text-zinc-100">Ainda tem dúvidas?</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Entre em contato conosco através do e-mail{" "}
                <a href="mailto:suporte@vamoagendar.com.br" className="font-medium text-violet-400 hover:text-violet-300">
                  suporte@vamoagendar.com.br
                </a>
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Respondemos em até 24 horas úteis
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/planos"
              className="inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Ver planos e preços
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-700">
        <div className="flex items-center justify-center gap-4">
          <Link href="/faturamento" className="hover:text-zinc-500">
            Faturamento
          </Link>
          <span>•</span>
          <Link href="/planos" className="hover:text-zinc-500">
            Planos
          </Link>
          <span>•</span>
          <span>VamoAgendar &middot; Agendamento simples para profissionais</span>
        </div>
      </footer>
    </div>
  );
}
