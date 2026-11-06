import Image from "next/image";

const testimonials = [
  {
    name: "Deepak Gupta & Renu Gupta",
    role: "Parents · Jaipur",
    relation: "Parent",
    content: "We are truly grateful for the support and leadership shown during our children's sports day. Your dedication made the event special and created memories that will last a lifetime.",
    rating: 5,
    avatar: "/smhs_images/testimonials/deepak-gupta.webp",
  },
  {
    name: "Narendra Kumar Sharma & Soniya Yadav",
    role: "Parents · Vaishali Nagar",
    relation: "Parent",
    content: "The school provides holistic education, nurturing academic growth, creativity, and confidence. Teachers go beyond teaching and create a motivating environment for children.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Soniya-Yadav.webp",
  },
  {
    name: "Bhanupriya Singh",
    role: "Parent · MI Road",
    relation: "Parent",
    content: "The academic programme is well planned and balanced with co-curricular activities. Teachers and management are doing a great job in grooming children for a bright future.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Bhanupriya-Singh.webp",
  },
  {
    name: "Mrs. Anita Gupta",
    role: "Parent · Raja Park",
    relation: "Parent",
    content: "The curriculum and teaching methods are impressive. Worksheets and activities help children think beyond textbooks and develop a genuine love for learning.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Anita-Gupta.webp",
  },
  {
    name: "Ibha Chhabra",
    role: "Parent · Jhotwara",
    relation: "Parent",
    content: "We are grateful for the care, dedication, and guidance provided by the teachers and school management. The environment here truly brings out the best in every child.",
    rating: 5,
    avatar: "/smhs_images/testimonials/ibha-chadra.webp",
  },
  {
    name: "Aditi Sharma",
    role: "Parent · Vaishali Nagar",
    relation: "Parent",
    content: "The school provides modern, relevant education — giving us real confidence in our child's future. The focus on both academics and life skills is commendable.",
    rating: 5,
    avatar: "/smhs_images/testimonials/aditi-sharma.webp",
  },
  {
    name: "Sweta Shrivastava",
    role: "Parent · MI Road",
    relation: "Parent",
    content: "Technology integration makes learning interactive and helps children build essential digital skills for the future. The teachers are always available and supportive.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Sweta-Shrivastava.webp",
  },
  {
    name: "Muskan Rupani",
    role: "Parent · Jaipur",
    relation: "Parent",
    content: "The school sets high standards in education with skilled teachers ensuring overall personality development. We are proud to be part of the Seedling family.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Muskan-Rupani.webp",
  },
];

function Chevron({ direction }: { direction: "left" | "right" }) {
  return direction === "left" ? (
    <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" /></svg>
  ) : (
    <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></svg>
  );
}

export default function TestimonialsSection() {
  const first = testimonials[0];

  return (
    <section
      id="testimonials"
      data-testimonials
      className="home-deferred-content home-deferred-testimonials relative w-full overflow-hidden bg-[#034ea2] py-14 md:py-20"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(249,148,30,0.08)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(3,78,162,0.06)_0%,transparent_50%)]" />
        <div className="absolute top-20 left-10 md:left-32 text-white/5"><svg className="w-32 h-32 md:w-48 md:h-48 rotate-180" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C8 3 5 6 5 10v8h7v-7H8c0-2 1-4 4-4zm8 0c-4 0-7 3-7 7v8h7v-7h-4c0-2 1-4 4-4z" /></svg></div>
        <div className="absolute bottom-20 right-10 md:right-32 text-white/5"><svg className="w-32 h-32 md:w-48 md:h-48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C8 3 5 6 5 10v8h7v-7H8c0-2 1-4 4-4zm8 0c-4 0-7 3-7 7v8h7v-7h-4c0-2 1-4 4-4z" /></svg></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/80 text-sm font-medium mb-6">
            <svg className="w-4 h-4 fill-[#d6d1cf] text-[#d6d1cf]" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.9 6 6.6.9-4.8 4.7 1.1 6.6-5.8-3.1-5.8 3.1 1.1-6.6L2.5 8.9l6.6-.9L12 2Z" /></svg>
            Community Voices
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">Stories That<br /><span className="relative inline-block mt-2"><span className="relative z-10 text-[#d6d1cf]">Define Us</span><span className="absolute bottom-1 left-0 w-full h-2 md:h-3 bg-[#d6d1cf]/20 -z-0 origin-left" /></span></h2>
          <p className="mt-4 text-base md:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">Real experiences from the Seedling community—students discovering their potential, parents witnessing transformation, and alumni changing the world.</p>
        </div>

        <div className="relative max-w-5xl mx-auto w-full perspective-1000">
          <article data-testimonial-card className="relative bg-white rounded-3xl md:rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.35)] border border-white/10 overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
              <div className="relative bg-gradient-to-br from-[#034ea2] via-[#034ea2] to-[#0a3264] p-4 md:p-6 flex flex-col justify-between min-h-[200px] md:min-h-[280px]">
                <div className="absolute inset-0 opacity-20" aria-hidden="true"><div className="absolute top-0 right-0 w-64 h-64 bg-[#d6d1cf]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" /><div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d6d1cf]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" /></div>
                <span className="relative z-10 inline-flex w-fit items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">{first.relation}</span>
                <div className="relative z-10 mt-auto">
                  <div className="w-14 h-14 md:w-18 md:h-18 rounded-full overflow-hidden border-2 border-[#d6d1cf]/40 mb-4 flex-shrink-0"><Image data-testimonial-avatar src={first.avatar} alt={first.name} width={72} height={72} className="w-full h-full object-cover object-top" /></div>
                  <h3 data-testimonial-name className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">{first.name}</h3>
                  <p data-testimonial-role className="text-white/70 text-xs md:text-sm font-medium">{first.role}</p>
                </div>
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-white/5 rotate-180" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3C8 3 5 6 5 10v8h7v-7H8c0-2 1-4 4-4zm8 0c-4 0-7 3-7 7v8h7v-7h-4c0-2 1-4 4-4z" /></svg>
              </div>

              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">
                <div data-testimonial-rating className="flex gap-1 mb-6" aria-label="5 out of 5 stars">{Array.from({ length: first.rating }, (_, i) => <span key={i} className="text-[#d6d1cf]" aria-hidden="true">★</span>)}</div>
                <blockquote data-testimonial-content className="text-base md:text-lg text-[#034ea2] font-medium leading-relaxed mb-4">&ldquo;{first.content}&rdquo;</blockquote>
                <div className="w-12 h-0.5 bg-[#d6d1cf] rounded-full mb-6" />
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#d6d1cf]" /><span className="text-sm font-semibold text-[#034ea2]/80 uppercase tracking-wider">Seedling Modern High School</span></div>
              </div>
            </div>
          </article>

          <div className="flex items-center justify-between mt-10 md:mt-14">
            <div data-testimonial-indicators className="flex gap-2">
              {testimonials.map((item, index) => (
                <button key={item.name} type="button" data-testimonial-index={index} aria-label={`Go to testimonial ${index + 1}`} aria-current={index === 0 ? "true" : undefined} className={`group relative h-2 rounded-full overflow-hidden transition-all duration-500 ${index === 0 ? "w-12" : "w-4"}`}>
                  <span className={`absolute inset-0 rounded-full ${index === 0 ? "bg-[#d6d1cf]" : "bg-white/20"}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" data-testimonial-previous aria-label="Previous testimonial" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 shadow-sm flex items-center justify-center text-white hover:border-[#a3123f] hover:text-[#a3123f] transition-colors group"><Chevron direction="left" /></button>
              <button type="button" data-testimonial-next aria-label="Next testimonial" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#a3123f] shadow-lg shadow-[#a3123f]/25 flex items-center justify-center text-white hover:bg-[#8e1037] transition-colors group"><Chevron direction="right" /></button>
            </div>
          </div>

          <div className="absolute -bottom-8 right-0 text-white/30 font-mono text-sm"><span data-testimonial-current className="text-white font-bold">01</span><span className="mx-2">/</span><span>08</span></div>
        </div>
      </div>

      <script type="module">
        {`(function(){
          var section=document.querySelector('[data-testimonials]');
          if(!section)return;
          var items=${JSON.stringify(testimonials)};
          var active=false;
          function activate(){
            if(active)return;
            active=true;
            var index=0;
            var direction=1;
            var card=section.querySelector('[data-testimonial-card]');
            var avatar=section.querySelector('[data-testimonial-avatar]');
            var name=section.querySelector('[data-testimonial-name]');
            var role=section.querySelector('[data-testimonial-role]');
            var content=section.querySelector('[data-testimonial-content]');
            var rating=section.querySelector('[data-testimonial-rating]');
            var current=section.querySelector('[data-testimonial-current]');
            var dots=Array.from(section.querySelectorAll('[data-testimonial-index]'));
            function show(next){
              index=(next+items.length)%items.length;
              var item=items[index];
              avatar.src=item.avatar;
              avatar.alt=item.name;
              name.textContent=item.name;
              role.textContent=item.role;
              content.textContent='“'+item.content+'”';
              rating.setAttribute('aria-label',item.rating+' out of 5 stars');
              current.textContent=String(index+1).padStart(2,'0');
              dots.forEach(function(dot,i){
                var selected=i===index;
                dot.setAttribute('aria-current',selected?'true':'false');
                dot.classList.toggle('w-12',selected);
                dot.classList.toggle('w-4',!selected);
                var fill=dot.firstElementChild;
                fill.classList.toggle('bg-[#d6d1cf]',selected);
                fill.classList.toggle('bg-white/20',!selected);
              });
              card.classList.remove('animate-testimonial-next','animate-testimonial-previous');
              void card.offsetWidth;
              card.classList.add(direction>0?'animate-testimonial-next':'animate-testimonial-previous');
            }
            section.querySelector('[data-testimonial-previous]').addEventListener('click',function(){direction=-1;show(index-1);});
            section.querySelector('[data-testimonial-next]').addEventListener('click',function(){direction=1;show(index+1);});
            dots.forEach(function(dot){dot.addEventListener('click',function(){var next=Number(dot.dataset.testimonialIndex);direction=next>index?1:-1;show(next);});});
            var timer=window.setInterval(function(){if(!section.matches(':hover')){direction=1;show(index+1);}},6000);
            section.addEventListener('mouseenter',function(){window.clearInterval(timer);});
            section.addEventListener('mouseleave',function(){window.clearInterval(timer);timer=window.setInterval(function(){direction=1;show(index+1);},6000);});
          }
          if('IntersectionObserver' in window){
            var observer=new IntersectionObserver(function(entries){if(entries.some(function(entry){return entry.isIntersecting})){activate();observer.disconnect();}},{rootMargin:'1400px 0px'});
            observer.observe(section);
          }else{activate();}
        })();`}
      </script>
    </section>
  );
}
