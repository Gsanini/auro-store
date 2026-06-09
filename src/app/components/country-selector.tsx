import type { Localization } from "../../lib/shopify";
import { setCountryAction } from "../actions";

export function CountrySelector({
  localization,
}: {
  localization: Localization;
}) {
  if (localization.availableCountries.length < 2) {
    return (
      <p>
        Mercado: {localization.country.name} (
        {localization.country.currency.isoCode})
      </p>
    );
  }

  return (
    <form action={setCountryAction}>
      <label>
        Mercado{" "}
        <select name="country" defaultValue={localization.country.isoCode}>
          {localization.availableCountries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name} ({country.currency.isoCode})
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Atualizar</button>
    </form>
  );
}
