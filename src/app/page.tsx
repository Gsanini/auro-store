import { getCollectionByHandle, getLocalization } from "../lib/shopify";
import { getCurrentCountry } from "../lib/shopify/localization-session";
import Header from "./components/header";
import Hero from "./components/hero";
import Arrival from "./components/arrival";
import StressFree from "./components/stress-free";
import PerfectWatches from "./components/perfect-watches";

const NEW_ARRIVAL_COLLECTION_HANDLE = "new-arrival";

export default async function Home() {
  const country = await getCurrentCountry();
  const [newArrivalCollection] = await Promise.all([
    getCollectionByHandle(NEW_ARRIVAL_COLLECTION_HANDLE, {
      first: 4,
      country,
    }),
    getLocalization(country),
  ]);
  const newArrivalProducts = newArrivalCollection?.products.nodes ?? [];

  return (
    <main className='min-h-screen bg-offWhite text-[#414833]'>
      <Header />
      <Hero />
      <Arrival products={newArrivalProducts.slice(0, 3)} />
      <StressFree product={newArrivalProducts[0]} />
      <PerfectWatches products={newArrivalProducts} />
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
