import type { Money } from "./shopify";

export function formatMoney({ amount, currencyCode }: Money) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}
