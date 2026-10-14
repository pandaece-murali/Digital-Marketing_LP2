# PANDAeCe landing page

A responsive Next.js App Router marketing site with dark forest green + neon green styling, reveal animations, services, FAQ, testimonials, a multi-step booking UI, and a thank-you page.

## Run locally

1. Install Node.js (LTS) if it is not installed.
2. Open this folder in VS Code.
3. In the VS Code terminal run:

   ```bash
   npm install
   npm run dev
   ```
4. Visit http://localhost:3000

## Pages

- `/` — landing page
- `/booking` — consultation booking page with a configurable scheduling embed
- `/thank-you` — neutral next-steps page for scheduling-provider redirects

## Important before publishing

- **Calendar:** Set `NEXT_PUBLIC_BOOKING_URL` to your Calendly, Cal.com, or other provider booking URL. The booking page embeds that URL and offers a direct link if the embed fails. Without it, visitors see a setup message instead of sample availability.
- **Redirect:** Configure the scheduling provider to redirect to `/thank-you` after a completed booking. The page remains neutral because it does not independently verify provider confirmation.
- **Testimonials:** The testimonial copy and names are placeholders from the supplied draft. Replace them with verified customer reviews and real photos/business details before publishing.
- **Stats:** Confirm the experience, project and client figures before launch.
- **Discount:** Confirm eligibility and terms for the 20% offer.
- **Brand:** Replace the stylised “P” brand mark with your official PANDAeCe logo if available.
- Google Fonts are loaded from Google Fonts. If you prefer locally hosted fonts, remove the `@import` at the top of `app/globals.css` and configure `next/font`.

## Main stack

- Next.js App Router + TypeScript
- React
- Framer Motion
- Lucide React icons
- Plain CSS (no Tailwind setup required)
