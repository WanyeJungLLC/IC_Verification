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
- React Context for theme management and Internet Identity authentication
- AuthProvider context manages authentication state, principal, and neuron ID
- Local component state for UI interactions and modal orchestration

**Design Philosophy**: The application uses a "Design System with Web3 Context" approach, combining Etherscan's clarity, Linear's modern UI, and Stripe's trust-building elements. Key principles include transparency first, progressive disclosure of complex blockchain details, and guided educational experiences for first-time voters.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**API Design**: RESTful API structure with routes prefixed under `/api`. The server is designed to handle proposal data and voting operations, though current implementation shows placeholder routes ready for expansion.

**Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`). The architecture supports easy migration to persistent storage solutions. Database schema is defined using Drizzle ORM with PostgreSQL dialect.

**Development Environment**: Custom Vite middleware integration for HMR (Hot Module Replacement) in development mode, with separate production build pipeline using esbuild for server bundling.

### Core Features & Components

**Proposal Management**:
- Proposal listing with dynamic filtering by status (All, Active, Executed, Rejected)
- Real-time search by proposal ID with instant results
- Sorting options: newest first, oldest first, or most votes
- Real-time proposal type categorization (Canister Upgrade, IC OS Election, Node Provider, Participant Management)
- Empty state messaging when no proposals match filters
- Responsive card-based layout with key metrics display

**Verification System**:
- Integrated verification panel in ProposalDetailsModal showing hash comparison results
- Visual indicators for verification status (success/mismatch) with color-coded badges
- Git commit hash and WASM module hash display for canister upgrades
- IC OS version and commit hash for IC OS elections
- Verification script displays with copy-to-clipboard functionality
- Interactive tutorials for learning verification processes in Learning Center
- Real proposal examples (138130, 137938, 137937, 137936, 129394) used throughout

**Voting Interface**:
- Three-step voting flow with visual progress indicators: select → confirm → signing → success
- Vote options: Adopt, Reject, Abstain with distinct iconography
- Authentication gating - users must connect Internet Identity to vote
- Neuron ID display throughout voting process for transparency
- In-modal authentication prompts for unauthenticated users
- Vote confirmation screen showing proposal details and selected vote
- Simulated IC governance canister integration with error handling
- Toast notifications for vote submission success/failure
- Disabled vote buttons and clear messaging when not authenticated

**Educational Platform**:
- Interactive step-by-step tutorials
- Proposal type guides with examples
- Educational resources linking to official documentation
- Verification script displays with copy-to-clipboard functionality

### Authentication & Security

**Internet Identity Integration**: 
- Client-side authentication using DFINITY's Internet Identity system (@dfinity/auth-client)
- AuthProvider context wraps entire application, providing authentication state globally
- Login/logout flows handled through dedicated auth library (`client/src/lib/auth.ts`)
- Principal ID and Neuron ID derivation from authenticated identity
- Persistent session management across page refreshes
- Header-based authentication UI with connect/disconnect functionality
- User profile display showing truncated principal and full neuron ID

**Authentication Flow**:
- Users click "Connect Identity" to initiate Internet Identity authentication
- Upon successful authentication, principal and neuron ID are derived and stored in context
- Authenticated state persists in browser session
- VoteModal and other sensitive features check authentication status
- Clear visual indicators throughout UI showing authentication state

**Client-Side Security**: 
- All sensitive operations (voting, signing) happen client-side using DFINITY agent libraries
- Private keys never leave the user's browser
- No backend session storage required
- Trustless verification enables independent proposal validation

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

**Why Client-Side Authentication**: Internet Identity authentication happens entirely in the browser using @dfinity/auth-client. This eliminates the need for backend session management, reduces server complexity, and keeps private keys secure on the user's device.

**Why Client-Side Verification**: Hash verification is performed client-side to maintain trustlessness - users can independently verify proposals without relying on the application's backend.

**Why In-Memory Storage Initially**: The application currently uses in-memory storage with a clear migration path to PostgreSQL. This allows rapid development while maintaining production-ready database schemas.

**Why Modal-Based Details View**: Proposal details are shown in a modal rather than a separate page to maintain context and enable quick transitions between viewing details and voting. State management ensures smooth handoffs between ProposalDetailsModal and VoteModal.

**Why Wouter Over React Router**: Lightweight routing solution (1.8KB) chosen to minimize bundle size for a simple two-page application.

**Why Shadcn UI**: Provides owned, customizable components instead of a dependency, allowing fine-grained control over the governance interface design while maintaining accessibility through Radix UI primitives.

### Recent Updates (December 2025)

**Authentication System**:
- Implemented AuthProvider context for global authentication state
- Added Internet Identity login/logout flows in Header component
- Created auth utility library with principal/neuron ID derivation
- Integrated authentication checks throughout voting flows

**Proposal Details & Verification**:
- Built ProposalDetailsModal with comprehensive proposal information display
- Integrated verification panel showing hash comparison results
- Added visual indicators for verification status (green for match, red for mismatch)
- Included View on IC Dashboard external link

**Enhanced Voting Experience**:
- Enhanced VoteModal with authentication gating and neuron ID display
- Implemented three-step voting flow with progress indicators
- Added in-modal authentication prompts for unauthenticated users
- Integrated toast notifications for user feedback
- Fixed modal state orchestration for clean details→vote transitions

**Filter & Sort Functionality**:
- Implemented working status filter (All, Active, Executed, Rejected)
- Added real-time search by proposal ID
- Implemented three sort options: newest, oldest, most votes
- Added empty state for no matching proposals

**Learning Center**:
- Created comprehensive educational resources page at `/learn`
- Built interactive proposal type guides with real examples
- Added hash verification tool with step-by-step instructions
- Implemented verification script displays with copy functionality