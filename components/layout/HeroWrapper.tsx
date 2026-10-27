"use client";

import Image from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroWrapperProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  height?: "small" | "medium" | "large";
  overlayOpacity?: number;
  objectPosition?: string;
}

export default function HeroWrapper({
  backgroundImage,
  title,
  subtitle,
  badge,
  breadcrumbs = [],
  objectPosition = "center 35%",
}: HeroWrapperProps): React.JSX.Element {
  return (
    <div className="relative h-[360px] md:h-[420px] overflow-hidden">
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition }}
          priority
          sizes="100vw"
        />
      )}
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a3123f] via-[#a3123f] to-[#a3123f] z-10" />
      {/* dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010e3a]/62 to-[#010e3a]/78" />
      {/* centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6 pb-8">
        <div className="flex items-center gap-2.5">
          <span className="block w-6 h-[1.5px] bg-white" />
          <span className="text-white text-[10px] font-bold tracking-[0.55em] uppercase">{badge}</span>
          <span className="block w-6 h-[1.5px] bg-white" />
        </div>
        <h1
          className="font-serif font-bold text-white leading-[1.1]"
          style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
      {/* breadcrumb bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#01217e] rounded-t-[10px] flex items-center overflow-hidden whitespace-nowrap z-10">
        <Link href="/" className="px-5 py-[11px] text-[12px] font-semibold text-white/70 hover:text-white transition-colors">
          Home
        </Link>
        <span className="text-white/30 text-[11px]">›</span>
        <span className="px-5 py-[11px] text-[12px] font-bold text-white">{breadcrumbs[0]?.label || title}</span>
      </div>
    </div>
  );
}