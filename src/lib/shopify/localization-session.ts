import "server-only";

import { cookies } from "next/headers";
import type { CountryCode } from "./types";

const COUNTRY_COOKIE = "auro_country";
const COUNTRY_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const DEFAULT_COUNTRY = process.env.SHOPIFY_DEFAULT_COUNTRY ?? "BR";

function isCountryCode(value: string) {
  return /^[A-Z]{2}$/.test(value);
}

export async function getCurrentCountry(): Promise<CountryCode> {
  const value = (await cookies()).get(COUNTRY_COOKIE)?.value;

  return value && isCountryCode(value) ? value : DEFAULT_COUNTRY;
}

export async function saveCurrentCountry(country: CountryCode) {
  if (!isCountryCode(country)) {
    throw new Error("Código de país inválido.");
  }

  (await cookies()).set(COUNTRY_COOKIE, country, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COUNTRY_MAX_AGE_SECONDS,
  });
}
