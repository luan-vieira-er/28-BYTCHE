# CodeRace 2025 Frontend

This is the frontend application for CodeRace 2025, built with Next.js and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14** - React framework for production
- **React 18** - JavaScript library for building user interfaces
- **Tailwind CSS v3** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting and formatting

## Project Structure

```
frontend/
├── components/          # Reusable React components
│   ├── Layout.js       # Main layout wrapper
│   ├── Navbar.js       # Navigation component
│   └── Footer.js       # Footer component
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.js         # Custom App component
│   └── index.js        # Homepage
├── public/             # Static assets
├── styles/             # Global styles
│   └── globals.css     # Global CSS with Tailwind
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Features

- ✅ Next.js 14 with App Router support
- ✅ Tailwind CSS v3 with custom design system
- ✅ TypeScript support
- ✅ Responsive design
- ✅ ESLint configuration
- ✅ Custom components and layout
- ✅ Modern React patterns

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

The project includes a custom Tailwind configuration with:
- Custom color palette (primary colors)
- Utility classes for buttons and cards
- Responsive design patterns

You can modify the design system in `tailwind.config.js` and add custom styles in `styles/globals.css`.
