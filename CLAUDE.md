# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Lint code**: `npm run lint` (uses ESLint with Next.js TypeScript config)

## Architecture Overview

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS.

### Key Stack Components
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: Configured for shadcn/ui components (New York style)
- **Bundler**: Turbopack for development and production builds
- **Font**: Geist Sans and Geist Mono fonts

### Project Structure
- `app/` - Next.js App Router pages and layouts
- `lib/` - Shared utilities (includes `cn` helper for Tailwind classes)
- `components/` - React components (alias: `@/components`)
- `public/` - Static assets

### Import Aliases
- `@/*` - Root directory
- `@/components` - Components directory
- `@/lib/utils` - Utility functions
- `@/components/ui` - UI components
- `@/lib` - Library directory
- `@/hooks` - Custom hooks

### Key Dependencies
- `class-variance-authority` - For component variants
- `clsx` & `tailwind-merge` - Combined in `cn()` utility for conditional classes
- `lucide-react` - Icon library

### Configuration Notes
- ESLint extends Next.js core-web-vitals and TypeScript configs
- TypeScript uses bundler module resolution with path mapping
- Tailwind CSS configured with neutral base color and CSS variables
- Component library uses RSC (React Server Components) and TSX