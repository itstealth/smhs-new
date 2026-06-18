"use client";

const testimonials = [
  { name: "Priya Sharma", role: "Parent · Class XI", quote: "Seedling completely transformed how my daughter approaches learning. The faculty is outstanding and genuinely invested in every child's growth." },
  { name: "Rajan Mehta", role: "Parent · Class VIII", quote: "The blend of academic rigour and extracurricular opportunities is unlike anything we've seen. Our son has flourished here." },
  { name: "Ananya Verma", role: "Alumni · Batch 2023", quote: "The school gave me the discipline, confidence, and global outlook I needed to crack JEE and secure a seat in IIT Delhi." },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#a3123f] text-[11px] font-semibold tracking-[0.5em] uppercase mb-4">Voices of Trust</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#034ea2]">Parents & Alumni Speak</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-[#ffffff] rounded-lg p-8 relative">
              <div className="text-[#a3123f] text-5xl font-serif leading-none mb-4 opacity-40">"</div>
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#034ea2] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#034ea2] text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-[#a3123f] to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}