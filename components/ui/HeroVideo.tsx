"use client";

export default function HeroVideo(): React.JSX.Element {
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/banner-poster.jpg"
    >
      <source src="/SMHS-website_banner.mp4" type="video/mp4" />
    </video>
  );
}
