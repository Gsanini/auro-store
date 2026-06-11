import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "../../lib/shopify";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const features = [
  {
    number: "1.",
    title: "Trusted Precision",
    description:
      "High-quality quartz movement ensures accurate and dependable timekeeping.",
    position: "lg:col-start-1 lg:row-start-1",
  },
  {
    number: "2.",
    title: "Elegant Craftsmanship",
    description:
      "Refined details and premium finishes create a timeless everyday piece.",
    position:
      "border-l border-darkBack/12 lg:col-start-1 lg:row-start-2 lg:border-t lg:border-l-0",
  },
  {
    number: "3.",
    title: "Water Resistant Build",
    description:
      "Designed to handle daily splashes and light water exposure with ease.",
    position: "lg:col-start-3 lg:row-start-1",
  },
  {
    number: "4.",
    title: "Durable Materials",
    description:
      "Strong glass and scratch-resistant case made for long-lasting performance.",
    position:
      "border-l border-darkBack/12 lg:col-start-3 lg:row-start-2 lg:border-t lg:border-l-0",
  },
];

type StressFreeProps = {
  product?: ProductSummary;
};

export default function StressFree({ product }: StressFreeProps) {
  const image = product?.featuredImage;

  return (
    <section
      id='feature'
      aria-labelledby='stress-free-title'
      className='bg-lightCream px-5 py-18 sm:px-8 sm:py-24 lg:px-12 lg:py-10'
    >
      <div className='mx-auto max-w-295'>
        <div className='flex items-start justify-between gap-6'>
          <h2
            id='stress-free-title'
            className={`${displayFont.className} max-w-3xl text-[clamp(38px,5vw,68px)] leading-[0.98] font-normal tracking-[-0.04em] text-darkBack`}
          >
            The Keys to Stress-Free
            <br className='hidden sm:block' /> Watch Ownership.
          </h2>

          <Link
            href='/#shop'
            className='hidden min-h-11.5 mt-3 min-w-30 shrink-0 items-center justify-center rounded-full border border-darkBack bg-darkBack px-6.25 py-3.25 text-[11px] font-bold tracking-tight text-white shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-[background-color,color,transform] duration-220 hover:bg-white hover:text-darkBack focus-visible:-translate-y-0.5 focus-visible:bg-white focus-visible:text-darkBack focus-visible:outline-none sm:inline-flex min-[561px]:min-h-13 min-[561px]:min-w-35 min-[561px]:text-[13px]'
          >
            Our Shop
          </Link>
        </div>

        <div className='mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-darkBack/12 bg-white shadow-[0_16px_50px_rgba(4,24,20,0.05)] sm:mt-14 lg:grid-cols-[1fr_1.12fr_1fr] lg:grid-rows-2'>
          {features.slice(0, 2).map((feature) => (
            <Feature key={feature.number} {...feature} />
          ))}

          <div className='relative col-span-2 aspect-[1.15] border-y border-darkBack/12 bg-[#f2f0ec] lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-135 lg:border-x lg:border-y-0'>
            {product && image ? (
              <Link
                href={`/products/${product.handle}`}
                aria-label={`View ${product.title}`}
                className='group absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-darkBack'
              >
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  sizes='(max-width: 1023px) calc(100vw - 40px), 410px'
                  className='object-contain p-[9%] transition-transform duration-500 ease-out group-hover:scale-[1.035]'
                />
              </Link>
            ) : (
              <div className='flex h-full items-center justify-center px-8 text-center text-xs tracking-[0.18em] text-darkBack/35 uppercase'>
                Product image
              </div>
            )}
          </div>

          {features.slice(2).map((feature) => (
            <Feature key={feature.number} {...feature} />
          ))}
        </div>

        <Link
          href='/#shop'
          className='mt-7 inline-flex min-h-11.5 min-w-39.5 items-center justify-center rounded-full border border-darkBack bg-darkBack px-6.25 py-3.25 text-[11px] font-bold tracking-tight text-white shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-[background-color,color,transform] duration-220 hover:bg-white hover:text-darkBack focus-visible:-translate-y-0.5 focus-visible:bg-white focus-visible:text-darkBack focus-visible:outline-none sm:hidden'
        >
          Our Shop
        </Link>
      </div>
    </section>
  );
}

function Feature({
  number,
  title,
  description,
  position,
}: (typeof features)[number]) {
  return (
    <article
      className={`min-h-49 p-4 text-darkBack sm:min-h-56 sm:p-7 lg:min-h-0 lg:p-8 xl:p-10 ${position}`}
    >
      <span className='text-[12px] font-medium text-gray-400'>{number}</span>
      <div className='mt-12 sm:mt-16 lg:mt-20'>
        <h3 className='text-[13px] leading-tight font-medium tracking-[-0.025em] sm:text-[18px]'>
          {title}
        </h3>
        <p className='mt-2 max-w-62 text-[10px] leading-[1.45] text-darkBack/52 sm:text-[11.3px]'>
          {description}
        </p>
      </div>
    </article>
  );
}
