# Seedling Schools Website Redesign: Page-by-Page Prompts

This document contains a structured breakdown and a detailed copy-paste prompt for each page of the Seedling Schools website redesign. Use these prompts one by one with your AI assistant to generate the code for each page iteratively.

---

## 🎨 Global System Prompt / Context (Provide this first)

Before starting with the individual pages, ensure your AI has the following context. Include this in your first message or system instructions.

```text
You are an expert Frontend Developer tasked with redesigning the website for Seedling Schools (https://seedlingschools.com) using Next.js (App Router), TypeScript, and Tailwind CSS.

### Strict Rules:
1. **Content**: Use ONLY real content from the original website. Do not invent or use placeholder text (no lorem ipsum). If a section requires text you don't have, extract it from the live site or ask for it.
2. **Design Language**: 
   - Extract and use the authentic color theme from the original website. Do not invent new colors.
   - Typography should be clean, modern, and have a clear hierarchy.
   - The design must feel Premium, Minimal, Trustworthy, and "Jaw-Dropping".
   - Use card-based layouts, smooth hover effects, subtle entrance animations (e.g., using Framer Motion or Tailwind animate plugins), and generous whitespace.
3. **Responsiveness**: Mobile-first design is mandatory. Every component must look perfect on smartphones, tablets, and desktops.
```

---

## 🏠 1. Homepage

**Section Structure:**
1. **Hero Section**: Full-screen video background, overlay text, clear primary call to action (CTA).
2. **Introduction**: Short welcoming text, elegant typography, potentially an offset image grid.
3. **Infrastructure**: Tabs or a masonry grid (Campus, Sports, Testimonials, Results). Images combined with very short, punchy text.
4. **Instagram Interaction**: Responsive grid showing recent social updates (use placeholder images but style it beautifully as a real feed).
5. **Trending Updates**: Horizontal scrolling or a sleek carousel for news/updates.
6. **Parent Testimonials**: Elegant card slider with glowing borders or soft shadows, quotes, and parent names.

**UI Suggestions:** Add a subtle parallax effect on scrolling, glassmorphism for floating UI elements over the video hero, and staggered fade-in animations for section titles.

**📝 Prompt to use:**
```text
Build the Homepage (`app/page.tsx`) for the Seedling Schools redesign. 

REQUIREMENTS:
- Tech: Next.js App Router, TypeScript, Tailwind CSS.
- Content: Extract real content for the Homepage from https://seedlingschools.com. No dummy text!
- Structure to implement:
  1. Hero Section: Needs a video background with an overlay and main headline.
  2. Introduction: "About the school" with elegant, modern typography.
  3. Infrastructure Section: Create a visually stunning grid or tabbed layout showcasing 'Campus', 'Sports', 'Testimonials', and 'Results'.
  4. Instagram Feed section: Create a sleek 3x2 or 4x1 image grid representing a social feed.
  5. Trending Updates: A modern, card-based carousel or horizontal scroll area for news.
  6. Parent Testimonials: A premium slider with cards containing parent feedback.
- UI/UX: Implement a "Jaw-Dropping", premium feel. Use glassmorphism where appropriate, subtle hover animations on cards, and staggered entrance animations. Ensure it is fully responsive (mobile-first).
- Colors: Strictly use the original site's color palette.
```

---

## 🧭 2. Navbar & Footer (Layout Component)

**Section Structure:**
- **Navbar**: Sticky, frosted glass effect. Clean logo on the left, primary links, and a prominent CTA. Mega-menus or dropdowns for sub-links.
- **Footer**: 4-column layout based strictly on the user's structure.

**📝 Prompt to use:**
```text
Build the global Navigation and Footer components, and integrate them into `app/layout.tsx`.

REQUIREMENTS:
- Navbar: Make it a sticky header with a backdrop-blur (glassmorphism) effect. Create an elegant dropdown/mega-menu for the navigation links:
  - About (Intro, Legacy, Vision, Leadership, Affiliation)
  - Academics (Curriculum, Learning Support, Roll of Honour, Faculty)
  - School Life (Media, Sports, Beyond Academics)
  - Campus Highlights (News, Events)
  - Admissions (Process, Fee Structure, Transport)
  - Career, Alumni, Blog, Contact Us
- Footer: A premium, dark-themed footer. Columns layout containing:
  - Column 1: Quick Overview
  - Column 2: Policies (Link to /privacy-policy), Mandatory Disclosures (Link to /mandatory-disclosure)
  - Column 3: Brochure, ERP Login
  - Column 4: Terms & Conditions (Link to /terms-and-conditions)
- UI/UX: Smooth hover transitions on links, mobile hamburger menu with a slide-out drawer, high-end professional appearance.
```

---

## 📖 3. About Page Suite

**Pages Included:** Introduction, Seedling Legacy, Vision & Mission, Leadership, Affiliation & Accreditations.

**UI Suggestions:** Use split-screen layouts (half text, half sticky image), timeline designs for the "Legacy" page, and elegant profile cards for "Leadership". 

**📝 Prompt to use:**
```text
Build the 'About' section pages (e.g., `app/about/page.tsx`, `app/about/legacy/page.tsx`, `app/about/leadership/page.tsx`).

REQUIREMENTS:
- Content Source: Extract real content from https://seedlingschools.com/about and its sub-pages. DO NOT use placeholder text.
- Structure:
  - Intro & Vision/Mission: Use a clean, split-screen layout. Large, bold typography for the mission statement. 
  - Legacy: Design a beautiful vertical timeline component that highlights the school's history.
  - Leadership: Create premium profile cards for the principal/founders. Avoid generic square boxes; use subtle gradients or glowing borders, and rounded images.
  - Affiliations: A clean logo grid with short accompanying descriptions.
- UI/UX: Prioritize readability. Use generous line heights, soft gray backgrounds to separate sections, and fade-in animations on scroll.
```

---

## 🎓 4. Academics

**Pages Included:** Curriculum, Learning Support, Roll of Honour, Faculty.

**UI Suggestions:** Tabbed navigation for different grade levels in Curriculum. "Roll of Honour" should look prestigious.

**📝 Prompt to use:**
```text
Build the 'Academics' section pages (`app/academics/curriculum/page.tsx`, etc.).

REQUIREMENTS:
- Content Source: Use strictly real content from the Seedling Schools academics pages (https://seedlingschools.com/academics).
- Structure:
  - Curriculum: Implement a sleek, interactive tabbed interface (e.g., Primary, Middle, Senior sections).
  - Learning Support: A grid of feature cards explaining support systems.
  - Roll of Honour: Design a prestigious-looking section. Use subtle gold or brand-colored accents to give it an elite feel.
  - Faculty: Create a clean, grid of faculty members. Keep it minimal and professional.
- UI/UX: Make information easy to digest. Use accordions for heavy text areas, and ensure interactive elements have satisfying 'click' and 'hover' states.
```

---

## 🎭 5. School Life & Campus Highlights

**Pages Included:** Media Gallery, Sports, Beyond Academics, News Coverage, Events.

**UI Suggestions:** Masonry layout for the Media Gallery. Event cards with date badges.

**📝 Prompt to use:**
```text
Build the 'School Life' and 'Campus Highlights' sections.

REQUIREMENTS:
- Content Source: Real imagery and text from the original site.
- Structure:
  - Media Gallery & News: Build a responsive Masonry image grid.
  - Sports & Beyond Academics: Use alternating left/right image-and-text blocks.
  - Events: Create modern Event Cards featuring a prominent "Date" badge (e.g., "OCT 24") on the side or corner, title, brief description, and a "Read More" button.
- UI/UX: Focus on rich imagery. Implement lazy loading. Use Tailwind's group-hover utilities to create advanced card hover effects (e.g., image slight zooming inside a hidden overflow).
```

---

## 📝 6. Admissions

**Pages Included:** Admission Process, Fee Structure, Transport Facility.

**UI Suggestions:** A visually appealing step-by-step flowchart or staggered card layout for admissions.

**📝 Prompt to use:**
```text
Build the 'Admissions' pages.

REQUIREMENTS:
- Content Source: Extract genuine admission steps, transport, and fee details from the original website.
- Structure:
  - Admission Process: Create a beautifully numbered, step-by-step flowchart or staggered card layout (Step 1, Step 2, Step 3) with visual progression.
  - Fee Structure: Design a highly readable, premium pricing-card layout or crisp table. Ensure it stacks perfectly on mobile.
  - Transport Facility: Include a visually clean route list. 
- UI/UX: The goal here is clarity and trust. Provide a sticky "Apply Now" or "Download Form" floating action button.
```

---

## 📞 7. Career, Alumni, Blog, Contact Us

**UI Suggestions:** A polished map integration and floating contact form for the Contact page. Modern inputs.

**📝 Prompt to use:**
```text
Build the auxiliary pages: Career, Alumni, Blog, and Contact Us.

REQUIREMENTS:
- Content Source: Real content from the current website.
- Structure:
  - Contact Us: Two-column layout. Left: Address, Phone, Email, working hours. Right: Sleek contact form with floating labels. 
  - Blog & Alumni: Standardized article/profile cards with thumbnails and excerpts.
  - Career: An accordion or list of current openings with a clean file upload element for resumes.
- UI/UX: Form inputs must have focused states (`focus:ring`, `focus:border-color`) to feel reactive. Add a subtle shadow on hover for all cards.
```
