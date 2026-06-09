import Link from "next/link";
import {
  applyDiscountCodeAction,
  checkoutAction,
  createCartAction,
  removeCartLineAction,
  removeDiscountCodeAction,
  updateCartLineAction,
} from "../actions";
import { CountrySelector } from "../components/country-selector";
import { formatMoney } from "../../lib/format-money";
import { getLocalization } from "../../lib/shopify";
import { getCurrentCart } from "../../lib/shopify/cart-session";
import { getCurrentCountry } from "../../lib/shopify/localization-session";

export default async function CartPage() {
  const country = await getCurrentCountry();
  const [cart, localization] = await Promise.all([
    getCurrentCart(),
    getLocalization(country),
  ]);

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/">Produtos</Link>
        <Link href="/collections">Coleções</Link>
      </nav>

      <h1 className="text-4xl font-semibold">Carrinho</h1>

      <div className="mt-4">
        <CountrySelector localization={localization} />
      </div>

      {!cart ? (
        <section className="mt-8">
          <p>Seu carrinho está vazio.</p>
          <form action={createCartAction} className="mt-4">
            <button type="submit">Criar carrinho</button>
          </form>
        </section>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-8">
            {cart.lines.nodes.map((line) => (
              <article key={line.id} className="flex gap-6">
                {line.merchandise.image && (
                  <img
                    src={line.merchandise.image.url}
                    alt={
                      line.merchandise.image.altText ||
                      line.merchandise.product.title
                    }
                    className="h-32 w-24 object-cover"
                  />
                )}

                <div>
                  <Link href={`/products/${line.merchandise.product.handle}`}>
                    <h2 className="text-lg">
                      {line.merchandise.product.title}
                    </h2>
                  </Link>
                  <p>{line.merchandise.title}</p>
                  <p>{formatMoney(line.cost.totalAmount)}</p>

                  <div className="mt-3 flex gap-4">
                    <form action={updateCartLineAction}>
                      <input type="hidden" name="lineId" value={line.id} />
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        max="999"
                        defaultValue={line.quantity}
                        className="w-16"
                      />
                      <button type="submit">Atualizar</button>
                    </form>

                    <form action={removeCartLineAction}>
                      <input type="hidden" name="lineId" value={line.id} />
                      <button type="submit">Remover</button>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <footer className="mt-10">
            <section className="mb-6">
              <h2 className="text-lg font-semibold">Cupom de desconto</h2>
              <form action={applyDiscountCodeAction} className="mt-2 flex gap-2">
                <input
                  type="text"
                  name="discountCode"
                  required
                  placeholder="Código do cupom"
                />
                <button type="submit">Aplicar</button>
              </form>

              {cart.discountCodes.map((discount) => (
                <form
                  key={discount.code}
                  action={removeDiscountCodeAction}
                  className="mt-2 flex gap-2"
                >
                  <input
                    type="hidden"
                    name="discountCode"
                    value={discount.code}
                  />
                  <span>
                    {discount.code}:{" "}
                    {discount.applicable ? "aplicado" : "não aplicável"}
                  </span>
                  <button type="submit">Remover</button>
                </form>
              ))}
            </section>

            <p>Subtotal: {formatMoney(cart.cost.subtotalAmount)}</p>
            <p>Total: {formatMoney(cart.cost.totalAmount)}</p>
            <form action={checkoutAction} className="mt-4">
              <button type="submit" disabled={cart.totalQuantity === 0}>
                Ir para o checkout
              </button>
            </form>
          </footer>
        </>
      )}
    </main>
  );
}
