import { Playfair_Display } from "next/font/google";
import type { ProductSummary } from "../../lib/shopify";
import ArrivalCard from "./arrival-card";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const badges = ["New", "New arrival", "New"];

type ArrivalProps = {
  products: ProductSummary[];
};

export default function Arrival({ products }: ArrivalProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section
      id="shop"
      aria-labelledby="new-arrival-title"
      className="bg-lightCream px-5 py-18 sm:px-8 sm:py-24 lg:px-12 lg:py-22"
    >
      <div className="mx-auto max-w-295">
        <h2
          id="new-arrival-title"
          className={`${displayFont.className} text-center text-[clamp(38px,5vw,70px)] leading-none font-normal tracking-[-0.035em] text-darkBack`}
        >
          New Arrival
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-7">
          {products.map((product, index) => (
            <ArrivalCard
              key={product.id}
              product={product}
              badge={badges[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
