import { SITE } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const LINKS = [
  { href: "#catalogo", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
  { href: "#orcamento", label: "Orçamento" },
] as const;

const HOURS_FOOTER = [
  ["Segunda a sexta", "8h às 18h"],
  ["Sábado", "8h às 12h"],
  ["Domingo", "Fechado"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#07080a] pb-[calc(104px+env(safe-area-inset-bottom,0px))] pt-16">
      <div className="mx-auto max-w-[1224px] px-4 sm:px-8">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div className="grid content-start justify-items-start gap-4 text-sm text-muted">
            <a href="#inicio" aria-label="VA Vidro Arte, voltar ao topo" className="text-slate-100"><Logo className="h-[66px] w-auto" /></a>
            <p>{SITE.address}</p>
            <p>Atendimento: {SITE.city} e região</p>
          </div>

          <div>
            <h4 className="mb-3.5 text-[0.95rem] font-extrabold">Navegação</h4>
            <ul className="grid gap-2.5 text-sm text-muted">
              {LINKS.map((l) => <li key={l.href}><a href={l.href} className="hover:text-accent">{l.label}</a></li>)}
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[0.95rem] font-extrabold">Horário de atendimento</h4>
            <dl className="grid gap-2 text-sm">
              {HOURS_FOOTER.map(([day, hours]) => (
                <div key={day} className="flex max-w-60 justify-between gap-4">
                  <dt className="text-muted">{day}</dt>
                  <dd>{hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h4 className="mb-3.5 text-[0.95rem] font-extrabold">Fale com a equipe</h4>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-line-strong bg-surface px-4 py-3.5 transition hover:border-wa hover:bg-wa/5">
              <WhatsAppIcon className="size-6 text-wa" />
              <span className="grid text-sm"><strong>Comercial</strong><span className="text-muted">{SITE.phoneLabel}</span></span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.82rem] text-muted">
          <span>© {new Date().getFullYear()} {SITE.name} · {SITE.city}</span>
          <span>Vidros, esquadrias de alumínio, box, espelhos e guarda-corpo sob medida.</span>
        </div>
      </div>
    </footer>
  );
}
