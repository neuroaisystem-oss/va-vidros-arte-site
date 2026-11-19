import { HOURS, SITE, WEEKDAYS } from "../config/site";

export interface OpenStatus {
  open: boolean;
  /** Dia da semana atual em Marília (0 = domingo). */
  day: number;
  text: string;
}

const DAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function localParts(date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string): string => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: DAY_INDEX[get("weekday")] ?? 0,
    minutes: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10),
  };
}

/** Situação da loja agora, sempre no fuso de Marília, independente de onde a pessoa acessa. */
export function getStatus(date: Date = new Date()): OpenStatus {
  const { day, minutes } = localParts(date);
  const today = HOURS[day];
  if (today && minutes >= today[0] * 60 && minutes < today[1] * 60) {
    return { open: true, day, text: `Aberto agora · fecha às ${today[1]}h` };
  }
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const h = HOURS[d];
    if (h && (i > 0 || minutes < h[0] * 60)) {
      const when = i === 0 ? "hoje" : i === 1 ? "amanhã" : WEEKDAYS[d];
      return { open: false, day, text: `Fechado agora · abre ${when} às ${h[0]}h` };
    }
  }
  return { open: false, day, text: "Fechado agora" };
}
