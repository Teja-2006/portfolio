# Portfolio Support Page

## Overview
A portfolio support/donation page imported from Figma, built with React, Express, and Tailwind CSS. Displays card and Bitcoin donation options in a styled card component.

## Recent Changes
- 2026-02-07: Initial Figma import and migration to Replit environment

## Project Architecture
- **Frontend**: React 18 with Tailwind CSS, shadcn/ui components, wouter for routing
- **Backend**: Express server with Vite dev middleware
- **Build**: Vite for client bundling, esbuild for server
- **Styling**: Tailwind CSS v3 with custom CSS variables for theme colors (dark portfolio theme)
- **Fonts**: Fira Code (from Google Fonts)

### Directory Structure
- `client/` - React frontend (entry: `client/index.html`, main: `client/src/main.tsx`)
- `client/src/pages/` - Page components (Support.tsx is the main page)
- `client/src/components/ui/` - shadcn/ui component library
- `client/public/figmaAssets/` - SVG assets from Figma (card.svg, bitcoin.svg)
- `server/` - Express backend (entry: `server/index.ts`)
- `shared/` - Shared types/schema (Drizzle ORM schema)

### Key Configuration
- Server runs on port 5000 (0.0.0.0)
- Vite dev server runs in middleware mode through Express
- Path aliases: `@` → `client/src`, `@shared` → `shared`
