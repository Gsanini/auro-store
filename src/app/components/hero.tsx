import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";
import { Star } from "lucide-react";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const avatarTones = [
  "bg-[#d4cabc] [&>span]:bg-[#4a3c34]",
  "bg-[#c9ae91] [&>span]:bg-[#765743]",
  "bg-[#d8b4a7] [&>span]:bg-[#523b34]",
  "bg-[#b6b7ae] [&>span]:bg-[#6c5b50]",
];

const horizontalPosition =
  "left-[22px] min-[561px]:left-[max(6.5vw,calc((100vw-1480px)/2+42px))]";

const avatarClassName =
  "relative -ml-1.5 block size-[27px] overflow-hidden rounded-full border-[1.5px] border-lightCream shadow-[0_2px_8px_rgba(0,0,0,0.32)] first:ml-0 before:absolute before:inset-0 before:bg-[linear-gradient(140deg,rgba(255,255,255,0.58),transparent_48%)] before:content-[''] min-[561px]:size-[33px]";

const paginationButtonClassName =
  "size-1.5 cursor-pointer rounded-full border-0 bg-white/46 transition-[background-color,transform] duration-180 hover:scale-[1.16] hover:bg-white focus-visible:scale-[1.16] focus-visible:bg-white focus-visible:outline-none aria-[current=true]:scale-[1.16] aria-[current=true]:bg-white min-[561px]:size-[7px]";

export default function Hero() {
  return (
    <section
      className="relative isolate h-svh min-h-155 overflow-hidden bg-[#02100e] text-lightCream min-[561px]:min-h-150 min-[901px]:min-h-130"
      aria-labelledby="hero-title"
    >
      <Image
        src="/heroBg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="z-[-3] translate-y-11.5 object-cover object-[62%_center] min-[561px]:translate-y-13.5 min-[561px]:object-[64%_center] min-[901px]:translate-y-17 min-[901px]:object-center"
      />
      <div
        className={`${styles.shade} pointer-events-none absolute inset-0 z-[-2]`}
        aria-hidden="true"
      />

      <div
        className={`absolute top-[45%] w-[calc(100%-44px)] -translate-y-1/2 min-[561px]:top-[40%] min-[561px]:w-[min(76vw,540px)] min-[561px]:translate-y-[-54%] min-[901px]:w-[min(42vw,620px)] ${horizontalPosition}`}
      >
        <p className="mb-2.5 text-[10px] font-normal tracking-[-0.015em] text-white/70 min-[561px]:mb-3 min-[561px]:text-[clamp(10px,0.80vw,13px)]">
          Luxury Watch Brand
        </p>
        <h1
          id="hero-title"
          className={`${displayFont.className} text-balance text-[clamp(44px,13vw,61px)] leading-[0.94] font-normal tracking-[-0.035em] text-lightCream [text-shadow:0_2px_26px_rgba(0,0,0,0.14)] min-[561px]:text-[clamp(48px,4.70vw,80px)] min-[561px]:leading-[0.92]`}
        >
          Timeless Elegance
          <br />
          on Your Wrist
        </h1>
        <p className="mt-4.5 max-w-82 text-[10px] leading-[1.45] font-normal tracking-tight text-white/70 capitalize min-[561px]:mt-5.5 min-[561px]:max-w-130 min-[561px]:text-[clamp(10px,0.88vw,13px)]">
          Discover Watches Crafted With Precision, Premium Materials, And
          Designs That Last A Lifetime.
        </p>
        <Link
          href="/#shop"
          className="mt-6.25 inline-flex min-h-11.5 min-w-39.5 items-center justify-center rounded-full border border-creamFigma bg-creamFigma px-6.25 py-3.25 text-[11px] font-bold tracking-tight text-darkBack shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-[background-color,color,transform] duration-220  hover:bg-darkBack hover:text-white focus-visible:-translate-y-0.5 focus-visible:bg-[#0f3933] focus-visible:text-white focus-visible:outline-none min-[561px]:mt-7.75 min-[561px]:min-h-13 min-[561px]:min-w-44.5 min-[561px]:text-[13px]"
        >
          Explore Collection
        </Link>
      </div>

      <div
        className={`absolute bottom-6.5 flex items-center gap-3.25 min-[561px]:bottom-9.25 ${horizontalPosition}`}
        aria-label="Rated 4.9 out of 5 from 1,234 reviews"
      >
        <div className="flex items-center pl-0.5" aria-hidden="true">
          {avatarTones.map((tone) => (
            <span className={`${avatarClassName} ${tone}`} key={tone}>
              <span className="absolute top-1.5 left-1/2 block h-2.75 w-2.5 -translate-x-1/2 rounded-full shadow-[0_-2px_0_1px_#261f1b]" />
              <span className="absolute -bottom-2 left-1/2 block h-5 w-6 -translate-x-1/2 rounded-full" />
            </span>
          ))}
        </div>

        <div className="grid gap-1 text-[11.5px] leading-none text-white/95">
          <span className="flex items-center gap-1">
            4.9/5
            <Star className="size-3.25 fill-current" />
          </span>
          <small className="text-[10px] text-white/78">(1,234 Reviews)</small>
        </div>
      </div>

      <div
        className="absolute right-5.5 bottom-8.25 flex items-center gap-1.5 min-[561px]:right-[max(6.5vw,calc((100vw-1480px)/2+42px))] min-[561px]:bottom-11 min-[561px]:gap-2"
        aria-label="Hero slides"
      >
        {[1, 2, 3, 4, 5].map((slide) => (
          <button
            key={slide}
            type="button"
            aria-label={`Slide ${slide}`}
            aria-current={slide === 2 ? "true" : undefined}
            className={paginationButtonClassName}
          />
        ))}
      </div>
    </section>
  );
}
