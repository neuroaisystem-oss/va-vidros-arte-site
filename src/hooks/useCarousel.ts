import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";

const GAP = 16;

/**
 * Carrossel com scroll-snap nativo (swipe no celular) e navegação em loop pelas setas:
 * no fim, "próximo" volta ao início; no começo, "anterior" vai ao fim.
 * `resetKey` volta o carrossel ao início quando muda (ex.: troca de filtro).
 */
export function useCarousel<T extends HTMLElement>(resetKey: string) {
  const ref = useRef<T>(null);

  const scrollPage = useCallback((direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 2) return;

    if (direction === 1 && el.scrollLeft >= max - 2) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === -1 && el.scrollLeft <= 2) {
      el.scrollTo({ left: max, behavior: "smooth" });
    } else {
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.getBoundingClientRect().width ?? el.clientWidth) + GAP;
      const perPage = Math.max(1, Math.floor(el.clientWidth / cardWidth + 0.05));
      el.scrollBy({ left: direction * cardWidth * perPage, behavior: "smooth" });
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<T>) => {
      if (e.target !== e.currentTarget) return;
      if (e.key === "ArrowRight") { e.preventDefault(); scrollPage(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); scrollPage(-1); }
    },
    [scrollPage],
  );

  useEffect(() => {
    ref.current?.scrollTo({ left: 0 });
  }, [resetKey]);

  return { ref, scrollPage, onKeyDown };
}
