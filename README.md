# OXO Settlement - Crypto Checkout Page

OXO is a clean, compliant digital asset settlement platform built for businesses. It allows merchants to accept crypto payments (like BTC, ETH, SOL) and automatically settles the value in USDT directly to their business wallet.

## Core Features
- **Accept Crypto, Get USDT:** Customers pay with their preferred crypto, and you receive stable USDT without volatility risk.
- **Risk Screening & Quarantine Mode:** Automatic wallet checks before every settlement. Suspicious funds are isolated and never automatically touch your main wallet.
- **ZK Proof Reports:** Every settlement includes a cryptographic certificate proving the funds are clean, verifiable by anyone.
- **Multilingual Support:** Seamless toggling between English (EN) and Indonesian (ID) languages.
- **Fast Settlement:** BTC to USDT within 1-3 minutes using optimized routing.
- **Live Dashboard:** Real-time monitoring of deposits, swap routes, and settlements.

## Technology Stack
Built with modern, high-performance web tools:

- **[Astro](https://astro.build/):** The core web framework. Generates blazing-fast websites with zero client-side JS by default, perfect for high SEO performance.
- **[React 19](https://react.dev/):** Powers the interactive components and complex dynamic states (e.lg., localization and animated settlement flows).
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first styling framework used for the sleek, premium dark-mode aesthetic.
- **[TypeScript](https://www.typescriptlang.org/):** Strongly typed JavaScript for safer, more robust code.
- **Hosting:** Optimized for zero-configuration, lightning-fast deployment on **[Vercel](https://vercel.com/)**.

## Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pandooat/oxo-settlement.git
   cd checkout-oxo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser to view the project.

### Building for Production
To create a production-ready build:
```bash
npm run build
```
To preview the build locally:
```bash
npm run preview
```

## Project Structure
- `src/pages/`: Astro routing (e.g., `index.astro`, `features.astro`, `contact.astro`).
- `src/components/`: Reusable React components (e.g., `App.tsx`, `SettlementForm.tsx`, `Icons.tsx`).
- `src/layouts/`: Base HTML layouts defining global structure and SEO metadata.
- `src/lib/`: Application logic and content dictionaries (`dict.ts` for dual languages).
- `src/styles/`: Global stylesheets including custom Tailwind configuration.
