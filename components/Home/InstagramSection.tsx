"use client";

export default function InstagramSection() {
  return (
    <section className="py-14 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#a3123f] text-[11px] font-semibold tracking-[0.5em] uppercase mb-3">Instagram</p>
            <h2 className="font-serif text-3xl font-bold text-[#034ea2]">Follow Our Journey <span className="text-[#a3123f] italic">@smhsjaipur</span></h2>
          </div>
          <a href="https://www.instagram.com/smhsjaipur/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-semibold rounded-full hover:opacity-90 transition-opacity hidden md:block">
            Follow on Instagram
          </a>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-[#013975] to-[#034ea2] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer group">
              <div className="text-center">
                <div className="text-2xl mb-1 opacity-40 group-hover:opacity-70 transition-opacity">📸</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">Follow @smhsjaipur for the latest from campus</p>
      </div>
    </section>
  );
}