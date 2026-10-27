"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroVideo(): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const shouldPlayVideo = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    ).matches;

    if (!video || !shouldPlayVideo || connection?.saveData) return;

    const timer = window.setTimeout(() => {
      video.src = "/SMHS-website_banner.mp4";
      video.load();
      void video.play().catch(() => {});
    }, 2500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Image src="/banner-poster.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover object-center" muted loop playsInline preload="none" aria-hidden="true" />
    </>
  );
}