# NextGen — Official Website

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182.0-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

Welcome to the official repository of **NextGen Supercomputing**, an interactive web platform showcasing supercomputing initiatives, AI research, workshops, hackathons, and the NextGen community.

---

## Key Features

- **Modern Tech Stack**: Built with Next.js 16 App Router, React 19, and TypeScript.
- **3D Visualizations**: Powered by `@react-three/fiber`, `@react-three/drei`, and custom Three.js scenes including interactive particle effects and 3D animations.
- **Animations & Interactions**: Uses GSAP, Framer Motion, smooth typewriter effects, interactive dot grids, scroll animations, and a custom cursor.
- **Smooth Scrolling**: Integrated with `@studio-freight/lenis` for a smooth scrolling experience.
- **Contact System**: Serverless contact API built with `nodemailer` for email delivery, confirmations, and team notifications.
- **Events & Workshops**: Dedicated section for upcoming and past events, workshops, and hackathons.
- **Team & Initiatives**: Showcases research projects, initiatives such as the Riva Supercomputer, and community members.

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei`, `maath` |
| **Animations** | GSAP, `@gsap/react`, Framer Motion |
| **Styling** | Tailwind CSS v4, PostCSS, Lucide React |
| **Scroll Engine** | Lenis (`lenis`) |
| **Email Service** | Nodemailer |

---

## Project Structure

```text
NextGen-website/
├── README.md               # Root documentation
└── nextgen/                # Main Next.js application root
    ├── app/                # Next.js App Router directory
    │   ├── api/            # API endpoints (e.g. contact form route)
    │   │   └── contact/
    │   ├── components/     # UI components & 3D canvases
    │   │   ├── AboutUs.tsx
    │   │   ├── ClusterCarousel.tsx
    │   │   ├── CustomCursor.tsx
    │   │   ├── EventCard.tsx
    │   │   ├── EventsSection.tsx
    │   │   ├── Footer.tsx
    │   │   ├── GrainOverlay.tsx
    │   │   ├── Hero.tsx
    │   │   ├── HomeClient.tsx
    │   │   ├── InfiniteCarousel.tsx
    │   │   ├── InitiativesSection.tsx
    │   │   ├── InteractiveDotGrid.tsx
    │   │   ├── LoadingScreen.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── ParticleField.tsx
    │   │   ├── RivaSection.tsx
    │   │   ├── ScrollReveal.tsx
    │   │   ├── SmoothScrollProvider.tsx
    │   │   └── SphereAnimation.tsx
    │   ├── contact/
    │   ├── events/
    │   ├── team/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── public/
    ├── CONTACT_SETUP.md
    ├── next.config.ts
    ├── package.json
    └── tsconfig.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or later)
- `npm` (v9+), `yarn`, `pnpm`, or `bun`

### Installation

1. Clone the repository:

```bash
git clone https://github.com/NextGenNvidia/NextGen-website.git
cd NextGen-website/nextgen
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file inside the `nextgen` directory.

```bash
cp .env.local.example .env.local
```

Add your SMTP credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@nextgensupercomputing.org
```

For detailed SMTP setup instructions, refer to `CONTACT_SETUP.md`.

4. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Available Scripts

Inside the `nextgen` directory:

- `npm run dev` – Starts the development server with Turbopack.
- `npm run dev:webpack` – Starts the development server using Webpack.
- `npm run build` – Builds the application for production.
- `npm run start` – Starts the production server locally.
- `npm run lint` – Runs ESLint.

---

## Contact & Community

For inquiries, collaborations, or community participation:

- **Email:** dgxcoe@kiet.edu
- **Website:** https://www.nextgen-supercomputing.in/
- **LinkedIn:** https://www.linkedin.com/company/nextgen-supercomputing/

---

## License

This project is maintained by the **NextGen Supercomputing Team**. All rights reserved.
