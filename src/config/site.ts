/** Dados da empresa em um único lugar. Altere aqui e o site inteiro acompanha. */
export const SITE = {
  name: "VA Vidros Arte",
  city: "Marília-SP",
  whatsappNumber: "5514998713805",
  phoneLabel: "(14) 99871-3805",
  address: "Rua João Martins Coelho, 2771 – Marília/SP",
  mapsQuery: "João Martins Coelho 2771 Marília SP",
  timeZone: "America/Sao_Paulo",
  defaultMessage: "Olá! Vim pelo site da VA Vidros Arte e gostaria de um orçamento.",
} as const;

/** Horário por dia da semana (0 = domingo): [abre, fecha] em horas, ou null quando fechado. */
export type OpeningHours = readonly [open: number, close: number] | null;

export const HOURS: Readonly<Record<number, OpeningHours>> = {
  0: null,
  1: [8, 18],
  2: [8, 18],
  3: [8, 18],
  4: [8, 18],
  5: [8, 18],
  6: [8, 12],
};

export const WEEKDAYS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"] as const;

/** Linhas exibidas na lista de horários. */
export const HOURS_ROWS = [
  { label: "Segunda a sexta", value: "8h às 18h", days: [1, 2, 3, 4, 5] },
  { label: "Sábado", value: "8h às 12h", days: [6] },
  { label: "Domingo", value: "Fechado", days: [0] },
] as const;
