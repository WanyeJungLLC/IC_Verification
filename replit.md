# IC Governance Voting Application

## Overview

This is an Internet Computer (IC) governance voting application that enables users to participate in the Network Nervous System (NNS) by viewing, verifying, and voting on governance proposals. The application focuses on transparency and verification, allowing users to verify proposal content on-chain and cast votes using Internet Identity authentication. Built as a full-stack web application, it serves as both a utility tool for governance participation and an educational platform for learning about proposal verification.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with two main routes:
- Home (`/`) - Main proposal listing and voting interface
- Learn (`/learn`) - Educational resources and verification tutorials

**UI Component System**: Shadcn UI components built on Radix UI primitives with Tailwind CSS for styling. The design follows Material Design principles adapted for blockchain governance, emphasizing trust, transparency, and clarity. Custom theme system supports both light and dark modes with carefully chosen color palettes optimized for data-intensive governance interfaces.

**State Management**: 
- TanStack Query (React Query) for server state and API data fetching
- React Context for theme management
- Local component state for UI interactions

**Design Philosophy**: The application uses a "Design System with Web3 Context" approach, combining Etherscan's clarity, Linear's modern UI, and Stripe's trust-building elements. Key principles include transparency first, progressive disclosure of complex blockchain details, and guided educational experiences for first-time voters.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**API Design**: RESTful API structure with routes prefixed under `/api`. The server is designed to handle proposal data and voting operations, though current implementation shows placeholder routes ready for expansion.

**Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`). The architecture supports easy migration to persistent storage solutions. Database schema is defined using Drizzle ORM with PostgreSQL dialect.

**Development Environment**: Custom Vite middleware integration for HMR (Hot Module Replacement) in development mode, with separate production build pipeline using esbuild for server bundling.

### Core Features & Components

**Proposal Management**:
- Proposal listing with filtering by status (Active, Executed, Rejected, Pending)
- Search by proposal ID
- Sorting by date or vote count
- Real-time proposal type categorization (Canister Upgrade, IC OS Election, Node Provider, Participant Management)

**Verification System**:
- Hash verification tools for comparing local builds with on-chain proposals
- Interactive tutorials for learning verification processes
- Script displays for different proposal types (canister upgrades, IC OS elections)
- On-chain verification panels showing content hash comparisons

**Voting Interface**:
- Three-step voting flow: selection, confirmation, signing
- Vote options: Adopt, Reject, Abstain
- Modal-based voting experience with Internet Identity integration

**Educational Platform**:
- Interactive step-by-step tutorials
- Proposal type guides with examples
- Educational resources linking to official documentation
- Verification script displays with copy-to-clipboard functionality

### Authentication & Security

**Internet Identity Integration**: Client-side authentication using DFINITY's Internet Identity system (@dfinity/auth-client). The application supports neuron-based voting without requiring backend session management.

**Client-Side Security**: All sensitive operations (voting, signing) happen client-side using DFINITY agent libraries, ensuring private keys never leave the user's browser.

## External Dependencies

### DFINITY Internet Computer SDK
- `@dfinity/agent` - Core agent for IC interactions
- `@dfinity/auth-client` - Internet Identity authentication
- `@dfinity/candid` - Candid interface definitions
- `@dfinity/principal` - Principal ID management

### Database & ORM
- Drizzle ORM with PostgreSQL dialect for schema management
- `@neondatabase/serverless` - Neon serverless Postgres driver
- Database migrations configured in `drizzle.config.ts`

### UI Component Libraries
- Radix UI primitives (accordion, dialog, dropdown-menu, select, tabs, toast, tooltip, etc.)
- Tailwind CSS for utility-first styling
- Lucide React for icons
- Class Variance Authority (CVA) for component variant management

### Form & Data Management
- React Hook Form with Zod resolvers for validation
- TanStack Query for server state management
- Zod for schema validation

### Development Tools
- Vite with React plugin for development and building
- TypeScript for type safety
- Replit-specific plugins for development environment integration
- PostCSS with Tailwind and Autoprefixer for CSS processing

### Additional Services
- Google Fonts (Inter font family) for typography
- NNS governance canister integration for proposal data
- Session management with `connect-pg-simple` (configured but not actively used)

### Notable Architecture Decisions

**Why Client-Side Verification**: Hash verification is performed client-side to maintain trustlessness - users can independently verify proposals without relying on the application's backend.

**Why In-Memory Storage Initially**: The application currently uses in-memory storage with a clear migration path to PostgreSQL. This allows rapid development while maintaining production-ready database schemas.

**Why Wouter Over React Router**: Lightweight routing solution (1.8KB) chosen to minimize bundle size for a simple two-page application.

**Why Shadcn UI**: Provides owned, customizable components instead of a dependency, allowing fine-grained control over the governance interface design while maintaining accessibility through Radix UI primitives.