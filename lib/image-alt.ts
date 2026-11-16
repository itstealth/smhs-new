/** Descriptions keyed by original asset path, before Next image optimization. */
export const IMAGE_ALT: Record<string, string> = {
  "/banner-poster-1920-3a15ee259962.webp": "Seedling Modern High School Jaipur — campus banner",
  "/smhs_images/seedling_images/leaders.webp": "School leadership team at Seedling Modern High School Jaipur",
  "/smhs_images/seedling_images/NCC.webp": "NCC cadets from Seedling Modern High School on parade",
  "/smhs_images/seedling_images/school_guard.webp": "Security guard at the entrance to Seedling Modern High School Jaipur",
  "/smhs_images/seedling_images/community.webp": "Students in a community service activity at SMHS Jaipur",
  "/smhs_images/seedling_images/newsAndEvents.webp": "News and events highlights at Seedling Modern High School",
  "/smhs_images/seedling_images/karate.webp": "Students practising karate at Seedling Modern High School Jaipur",
  "/smhs_images/seedling_images/smhs_about.webp": "About Seedling Modern High School — Jaipur campus view",
  "/smhs_images/seedling_images/privacy.webp": "Young students seated at colourful classroom tables at Seedling Modern High School",
  "/smhs_images/seedling_images/teaching_kids.webp": "Teacher instructing primary students at Seedling Modern High School",
  "/alumni/alumni_group.webp": "Alumni of Seedling Modern High School at a reunion gathering",
  "/smhs_images/seedling_images/smhs_tran.webp": "Seedling Modern High School Jaipur school bus — student transport",
  "/smhs_images/seedling_images/blog_image.webp": "How to prepare your child for school admission interviews — Seedling Modern High School blog",
  "/smhs_images/seedling_images/contact_us.webp": "Contact Seedling Modern High School Jaipur — campus banner",
  "/sports_and_other_images/P1500656.webp": "Students standing beside a volleyball net on the Seedling Modern High School court",
  "/smhs_images/seedling_images/learning_wrapper.webp": "Teacher-led classroom session at Seedling Modern High School",
  "/assets/img/sps-banner.webp": "Students reading together on school steps"
};

export function imageAltFor(src: string, title: string): string {
  return IMAGE_ALT[src] ?? `${title} — Seedling Modern High School Jaipur`;
}
