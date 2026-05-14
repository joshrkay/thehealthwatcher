# The Health Watchers Website

A modern React website for The Health Watchers, focused on population health in-home medical care, telemedicine support, senior living medical support, care gap closure, and program visibility.

## Tech Stack

- Vite
- React
- Tailwind CSS
- Lucide React icons

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Import this GitHub repository into Vercel.
2. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add the custom domains:
   - `thehealthwatchers.com`
   - `www.thehealthwatchers.com`
4. Update DNS in GoDaddy using the records Vercel provides.

## Notes

- The contact form is currently front-end only. It needs to be connected to a form backend, CRM, email service, or serverless function before launch.
- The site includes SEO metadata and JSON-LD schema for MedicalOrganization, Service, and FAQPage.
- This website should not be used to submit protected health information.
