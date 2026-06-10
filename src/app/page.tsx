import Link from "next/link";
import { addToCartAction } from "./actions";
import { CountrySelector } from "./components/country-selector";
import { formatMoney } from "../lib/format-money";
import { getLocalization, getProducts } from "../lib/shopify";
import { getCurrentCountry } from "../lib/shopify/localization-session";
import Header from "./components/header";
import Hero from "./components/hero";

export default async function Home() {
  const country = await getCurrentCountry();
  const [products] = await Promise.all([
    getProducts({ first: 24, country }),
    getLocalization(country),
  ]);

  return (
    <main className='min-h-screen bg-[#f6f5f3] text-[#414833]'>
      <Header />
      <Hero />

      {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {products.nodes.map((product) => {
          const firstVariant = product.variants.nodes[0];

          return (
            <article key={product.id}>
              <Link href={`/products/${product.handle}`}>
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="aspect-[4/5] w-full object-cover"
                  />
                )}

                <h2 className="mt-4 text-lg">{product.title}</h2>
              </Link>

              <p>{formatMoney(product.priceRange.minVariantPrice)}</p>

              {firstVariant?.availableForSale && (
                <form action={addToCartAction} className="mt-3">
                  <input
                    type="hidden"
                    name="merchandiseId"
                    value={firstVariant.id}
                  />
                  <input type="hidden" name="quantity" value="1" />
                  <button type="submit">Adicionar ao carrinho</button>
                </form>
              )}
            </article>
          );
        })}
      </div> */}
    </main>
  );
}
