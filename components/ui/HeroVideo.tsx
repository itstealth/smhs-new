export default function HeroVideo(): React.JSX.Element {
  return (
    <>
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet="/banner-poster-750-a7985d498dca.webp 750w, /banner-poster-1080-7dfbdffb73fd.webp 1080w"
          sizes="100vw"
          type="image/webp"
        />
        <img
          src="/banner-poster-1920-3a15ee259962.webp"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>
      <video
        data-hero-video
        className="absolute inset-0 w-full h-full object-cover object-center"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <script type="module">
        {`(function(){
          var video=document.querySelector('[data-hero-video]');
          var connection=navigator.connection;
          if(!video||!window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches||(connection&&connection.saveData))return;
          window.setTimeout(function(){
            video.src='/SMHS-website_banner.mp4';
            video.load();
            video.play().catch(function(){});
          },2500);
        })();`}
      </script>
    </>
  );
}
