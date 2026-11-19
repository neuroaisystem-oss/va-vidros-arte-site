import { categoryLabel, type Project } from "../data/catalog";
import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

interface ProjectCardProps {
  project: Project;
  /** Os primeiros cards carregam na hora; os demais, sob demanda. */
  eager?: boolean;
}

export function ProjectCard({ project, eager = false }: ProjectCardProps) {
  const label = categoryLabel(project.category);
  const message = `Olá! Vi o projeto "${project.title}" (${label}) no site da VA Vidros Arte e gostaria de um orçamento.`;

  return (
    <article className="flex shrink-0 basis-[85%] snap-start flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-line-strong sm:basis-[calc((100%-16px)/2)] lg:basis-[calc((100%-32px)/3)] xl:basis-[calc((100%-48px)/4)]">
      <div className="aspect-[4/3] overflow-hidden bg-field">
        <img
          src={project.image}
          alt={project.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition: project.position }}
          className="size-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-[18px]">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent">{label}</span>
        <h3 className="text-[1.1rem] font-bold tracking-tight">{project.title}</h3>
        <span className="text-sm text-muted">Projeto VA Vidros Arte</span>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pedir orçamento pelo WhatsApp: ${project.title}`}
          className="mt-3.5 inline-flex min-h-10 items-center gap-2 self-start rounded-full bg-wa px-4 text-sm font-bold text-wa-ink transition hover:brightness-110"
        >
          <WhatsAppIcon className="size-4" />
          Pedir orçamento
        </a>
      </div>
    </article>
  );
}
