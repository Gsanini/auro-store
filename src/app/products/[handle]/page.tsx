import Link from "next/link";
import { notFound } from "next/navigation";
import { addToCartAction } from "../../actions";
import { formatMoney } from "../../../lib/format-money";
import { getProductByHandle } from "../../../lib/shopify";
import { getCurrentCountry } from "../../../lib/shopify/localization-session";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle, await getCurrentCountry());

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/">Produtos</Link>
        <Link href="/cart">Carrinho</Link>
      </nav>

      <h1 className="text-4xl font-semibold">{product.title}</h1>
      <p className="mt-4">{product.description}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {product.images.nodes.map((image) => (
          <img
            key={image.url}
            src={image.url}
            alt={image.altText || product.title}
            className="w-full"
          />
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Variações</h2>
        <div className="mt-4 flex flex-col gap-3">
          {product.variants.nodes.map((variant) => (
            <form
              key={variant.id}
              action={addToCartAction}
              className="flex items-center gap-4"
            >
              <input type="hidden" name="merchandiseId" value={variant.id} />
              <input type="hidden" name="quantity" value="1" />
              <span>{variant.title}</span>
              <span>{formatMoney(variant.price)}</span>
              <button type="submit" disabled={!variant.availableForSale}>
                {variant.availableForSale ? "Adicionar" : "Indisponível"}
              </button>
            </form>
          ))}
        </div>
      </section>
    </main>
  );
}
