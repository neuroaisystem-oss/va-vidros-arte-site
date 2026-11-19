export type CategoryId =
  | "esquadrias"
  | "temperado"
  | "box"
  | "comum"
  | "espelhos"
  | "guarda-corpo"
  | "sacadas"
  | "fachadas";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Project {
  id: string;
  category: CategoryId;
  title: string;
  /** Caminho em /public. */
  image: string;
  alt: string;
  /** Ajuste do enquadramento da foto no card (CSS object-position). */
  position?: string;
}

export const CATEGORIES: readonly Category[] = [
  { id: "esquadrias", label: "Esquadrias de Alumínio" },
  { id: "temperado", label: "Vidro Temperado" },
  { id: "box", label: "Box" },
  { id: "comum", label: "Vidro Comum" },
  { id: "espelhos", label: "Espelhos" },
  { id: "guarda-corpo", label: "Guarda-corpo" },
  { id: "sacadas", label: "Sacadas" },
  { id: "fachadas", label: "Fachadas" },
];

export const categoryLabel = (id: CategoryId): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const PROJECTS: readonly Project[] = [
  { id: "showroom", category: "esquadrias", title: "Showroom de esquadrias", image: "/img/projeto-1.jpg", alt: "Esquadrias de alumínio pretas com vidro e venezianas expostas lado a lado" },
  { id: "porta-correr", category: "esquadrias", title: "Portas de alumínio e vidro", image: "/img/projeto-2.jpg", alt: "Porta de correr de alumínio preto com vidro instalada em obra" },
  { id: "box-banheiro", category: "box", title: "Box de banheiro", image: "/img/projeto-3.jpg", alt: "Box de vidro incolor com perfil preto em banheiro com janela", position: "50% 30%" },
  { id: "sacada", category: "sacadas", title: "Fechamento de sacada", image: "/img/projeto-4.jpg", alt: "Janelas de correr de alumínio escuro fechando uma sacada com vista para a cidade", position: "50% 40%" },
  { id: "box-preto", category: "box", title: "Box com perfil preto", image: "/img/projeto-5.jpg", alt: "Box de correr com perfil preto e puxador redondo", position: "50% 40%" },
  { id: "fechamento", category: "temperado", title: "Fechamento em vidro temperado", image: "/img/projeto-6.jpg", alt: "Fechamento com oito folhas de vidro temperado e alumínio preto em área de lazer" },
  { id: "vitrine", category: "fachadas", title: "Fachada de vidro comercial", image: "/img/projeto-7.jpg", alt: "Fachada de loja com vidro e porta de correr com puxador vertical preto" },
  { id: "veneziana", category: "esquadrias", title: "Veneziana de correr", image: "/img/projeto-8.jpg", alt: "Porta veneziana branca de duas folhas instalada em parede externa", position: "50% 35%" },
  { id: "janelas", category: "esquadrias", title: "Janelas com veneziana", image: "/img/projeto-9.jpg", alt: "Janelas de alumínio branco com folhas venezianas em fachada" },
  { id: "vidro-comum", category: "comum", title: "Vidros em estoque", image: "/img/vidro-comum.jpg", alt: "Chapas de vidro incolor em cavaletes azuis na oficina" },
  { id: "espelho", category: "espelhos", title: "Espelho com bisotê", image: "/img/espelho.jpg", alt: "Espelho retangular grande com moldura bisotada sobre aparador em sala de estar" },
  { id: "guarda-corpo", category: "guarda-corpo", title: "Guarda-corpo de vidro e inox", image: "/img/guarda-corpo.jpg", alt: "Guarda-corpo de vidro com corrimão de inox em varanda com vista para a cidade e o mar" },
];
