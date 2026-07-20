# NextGen — Official Website

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182.0-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

Welcome to the official repository of **NextGen Supercomputing**, an interactive high-performance web platform designed to showcase supercomputing initiatives, AI research, workshops, hackathons, and community team members.

---

## 🌟 Key Features

- **🚀 Ultra-Modern Tech Stack**: Built with Next.js 16 App Router, React 19, and TypeScript.
- **🎨 Immersive 3D Visualizations**: Powered by `@react-three/fiber`, `@react-three/drei`, and custom Three.js canvas shaders (3D Sphere animations, interactive particle fields).
- **✨ Dynamic Animations & Micro-Interactions**: Integrated with **GSAP**, **Framer Motion**, custom smooth typewriter text, interactive dot grid, scroll reveals, and custom glowing cursors.
- **🌊 Ultra-Smooth Inertial Scrolling**: Implemented using `@studio-freight/lenis` (Lenis Smooth Scroll Provider).
- **✉️ Full-Featured Contact System**: Serverless API route backed by `nodemailer` for email delivery with automated confirmations and team notifications.
- **📅 Events & Workshops Portal**: Filterable showcase of upcoming and past events (including hackathons like *AI Arena: Gotham Edition*).
- **👥 Interactive Team & Initiatives Sections**: Highlights key research, cluster projects (e.g., *Riva Supercomputer*), and team achievements.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei`, `maath` |
| **Animations** | GSAP, `@gsap/react`, Framer Motion |
| **Styling** | Tailwind CSS v4, PostCSS, Lucide React icons |
| **Scroll Engine** | Lenis (`lenis`) |
| **Email Service** | Nodemailer |

---

## 📂 Project Structure

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
    │   ├── contact/        # Contact Us page
    │   ├── events/         # Events showcase page
    │   ├── team/           # Team members page
    │   ├── globals.css     # Global styles & Tailwind v4 imports
    │   ├── layout.tsx      # Main application layout
    │   └── page.tsx        # Homepage
    ├── public/             # Static assets (images, logos, icons)
    ├── CONTACT_SETUP.md    # Detailed guide for contact form & email configuration
    ├── next.config.ts      # Next.js configuration
    ├── package.json        # Project dependencies & scripts
    └── tsconfig.json       # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- `npm` (v9+), `yarn`, `pnpm`, or `bun`

### Installation & Setup

1. **Clone the repository** (if not already local):
   ```bash
   git clone https://github.com/NextGenNvidia/NextGen-website.git
   cd NextGen-website/nextgen
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the `nextgen` directory:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your SMTP credentials for the contact form:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CONTACT_EMAIL=contact@nextgensupercomputing.org
   ```
   *(For detailed instructions regarding Gmail App Passwords or custom SMTP providers, refer to [`CONTACT_SETUP.md`](file:///c:/Users/vaish/Desktop/NextGen-website/nextgen/CONTACT_SETUP.md)).*

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

Inside the `nextgen` directory, you can run the following scripts:

- **`npm run dev`**: Launches Next.js dev server with Turbopack.
- **`npm run dev:webpack`**: Starts dev server forced with Webpack.
- **`npm run build`**: Compiles and builds the production bundle.
- **`npm run start`**: Runs the built production server locally.
- **`npm run lint`**: Runs ESLint to check code quality and formatting.

---

## 📬 Contact & Community

For inquiries, collaborations, or joining the NextGen Supercomputing community:
- **Email**: [dgxcoe@kiet.edu](mailto:dgxcoe@kiet.edu)
- **Website**: [NextGen Supercomputing](https://www.nextgen-supercomputing.in/)
- **Linkedin**: [NextGen Supercomputing](https://www.linkedin.com/company/nextgen-supercomputing/)

---

## 📄 License

This project is maintained by **NextGen Supercomputing Team**. All rights reserved.
