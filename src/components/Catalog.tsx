import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, PROJECTS, categoryLabel, type CategoryId } from "../data/catalog";
import { useCarousel } from "../hooks/useCarousel";
import { ProjectCard } from "./ProjectCard";

type Filter = CategoryId | "all";

const ARROW =
  "inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-white/5 backdrop-blur transition hover:border-accent hover:text-accent sm:size-12";

export function Catalog() {
  const [active, setActive] = useState<Filter>("all");

  const filters = useMemo(() => {
    const present = new Set(PROJECTS.map((p) => p.category));
    return CATEGORIES.filter((c) => present.has(c.id));
  }, []);

  const projects = useMemo(
    () => (active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active],
  );

  const { ref, scrollPage, onKeyDown } = useCarousel<HTMLDivElement>(active);

  return (
    <section id="catalogo" aria-labelledby="catalogo-title" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-[1224px] px-4 sm:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div className="grid min-w-0 gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Catálogo oficial</p>
            <h2 id="catalogo-title" className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Catálogo de serviços</h2>
            <p className="max-w-[60ch] text-muted">
              Esquadrias, vidros e acabamentos feitos sob medida. Escolha uma categoria e peça o orçamento direto pelo WhatsApp.
            </p>
          </div>
        </div>

        <div role="group" aria-label="Filtrar por categoria" className="mb-6 flex flex-wrap gap-2">
          {[{ id: "all" as const, label: "Todos" }, ...filters].map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
                active === f.id ? "border-accent bg-accent text-accent-ink" : "border-line-strong hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="mb-3.5 text-sm text-muted" aria-live="polite">
          {projects.length} {projects.length === 1 ? "projeto" : "projetos"}
          {active === "all" ? "" : ` em ${categoryLabel(active)}`}
        </p>

        <div
          ref={ref}
          tabIndex={0}
          role="region"
          aria-label="Projetos realizados. Use as setas do teclado para navegar."
          onKeyDown={onKeyDown}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} eager={i < 4} />
          ))}
        </div>

        {/* Setas abaixo dos cards, à direita. Navegação em loop (ver useCarousel). */}
        <div role="group" aria-label="Navegação do carrossel" className="mt-5 flex justify-end gap-2.5 max-sm:mr-[72px]">
          <button type="button" className={ARROW} aria-label="Projetos anteriores" onClick={() => scrollPage(-1)}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" className={ARROW} aria-label="Próximos projetos" onClick={() => scrollPage(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
