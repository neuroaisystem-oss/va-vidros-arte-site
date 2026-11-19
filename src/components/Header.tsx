import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { href: "#catalogo", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
  { href: "#orcamento", label: "Contato" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 h-[68px] border-b backdrop-blur-xl transition-colors sm:h-[76px] ${
        scrolled ? "border-line bg-obsidian/90" : "border-transparent bg-obsidian/35"
      }`}
    >
      <div className="mx-auto grid h-full max-w-[1224px] grid-cols-[1fr_auto] items-center gap-6 px-4 sm:px-8 md:grid-cols-[auto_1fr_auto]">
        <a href="#inicio" aria-label="VA Vidro Arte, início" className="text-slate-100">
          <Logo className="h-[50px] w-auto sm:h-[58px]" />
        </a>

        <nav aria-label="Principal" className="hidden justify-self-center md:flex md:gap-1.5">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3.5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 justify-self-end">
          <a href="#orcamento" className="hidden min-h-10 items-center rounded-full bg-accent px-4 text-sm font-bold text-accent-ink transition hover:brightness-110 md:inline-flex">
            Solicitar orçamento
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-line-strong bg-white/5 text-slate-100 hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="menu-mobile" className="absolute inset-x-0 top-full border-b border-line bg-obsidian/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto grid max-w-[1224px] gap-1 px-4 pb-5 pt-3 sm:px-8">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-line px-2 py-3.5 font-semibold hover:text-accent">
                {item.label}
              </a>
            ))}
            <a href="#orcamento" onClick={() => setMenuOpen(false)} className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-accent font-bold text-accent-ink">
              Solicitar orçamento
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
