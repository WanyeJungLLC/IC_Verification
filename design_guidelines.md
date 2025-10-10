# Internet Computer Governance Voting App - Design Guidelines

## Design Approach

**Selected Approach:** Design System with Web3 Context  
**Primary System:** Material Design principles adapted for blockchain governance  
**Reference Inspiration:** Etherscan's clarity + Linear's modern UI + Stripe's trust-building elements

**Rationale:** This is a utility-focused, data-intensive governance tool where trust, transparency, and learnability are paramount. Users need confidence in their voting actions, clear verification feedback, and intuitive workflows for blockchain interactions.

**Key Design Principles:**
1. Transparency First - Every action and verification step must be visible
2. Trust Through Clarity - Professional, clean design builds confidence
3. Progressive Disclosure - Complex blockchain details available but not overwhelming
4. Guided Experience - Built-in educational elements for first-time voters

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 220 90% 56% (Trustworthy blue for CTAs and interactive elements)
- Background: 0 0% 100% (Pure white for maximum clarity)
- Surface: 220 14% 96% (Light gray for cards and panels)
- Border: 220 13% 91% (Subtle dividers)
- Text Primary: 220 9% 15% (Near-black for readability)
- Text Secondary: 220 9% 46% (Medium gray for supporting text)
- Success: 142 71% 45% (Green for verified states)
- Warning: 38 92% 50% (Amber for pending actions)
- Error: 0 84% 60% (Red for verification failures)

**Dark Mode:**
- Primary: 217 91% 60% (Slightly brighter blue for visibility)
- Background: 222 47% 11% (Deep blue-gray base)
- Surface: 217 33% 17% (Elevated card background)
- Border: 217 33% 23% (Subtle borders)
- Text Primary: 210 40% 98% (High contrast white)
- Text Secondary: 217 20% 70% (Muted text)
- Success: 142 76% 36% (Darker green)
- Warning: 38 92% 50% (Maintained amber)
- Error: 0 84% 60% (Maintained red)

### B. Typography

**Font Stack:** Inter (primary), system-ui (fallback) via Google Fonts  
**Hierarchy:**
- Hero/Page Titles: text-4xl font-bold (36px, 900 weight)
- Section Headers: text-2xl font-semibold (24px, 600 weight)
- Card Titles: text-lg font-semibold (18px, 600 weight)
- Body Text: text-base font-normal (16px, 400 weight)
- Small/Meta: text-sm font-normal (14px, 400 weight)
- Code/Hashes: font-mono text-sm (14px monospace for addresses/hashes)

### C. Layout System

**Spacing Primitives:** Use Tailwind units 2, 4, 6, 8, 12, 16, 20  
**Common Patterns:**
- Component padding: p-6 (24px)
- Section spacing: space-y-8 (32px between major sections)
- Card gaps: gap-4 (16px between cards in grid)
- Form field spacing: space-y-4 (16px between inputs)
- Button padding: px-6 py-3 (24px horizontal, 12px vertical)

**Container Strategy:**
- Max width: max-w-7xl (1280px)
- Page padding: px-4 sm:px-6 lg:px-8
- Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for proposal cards

### D. Component Library

**Navigation Header:**
- Fixed top bar with logo, connected wallet status, Internet Identity connect button
- Subtle shadow for elevation (shadow-sm)
- Connection status badge showing neuron ID when authenticated
- Clear "Disconnect" option in user menu

**Proposal Cards:**
- Elevated cards with border and subtle shadow (border border-border shadow-sm)
- Header: Proposal ID badge + status indicator (Active/Executed/Rejected)
- Title: Bold, truncated with tooltip for overflow
- Metadata row: Proposer, deadline, current vote tally
- Verification badge: Green checkmark with "Verified" or pending state
- Primary CTA: "View Details" or "Vote Now" button
- Hover state: Subtle lift (hover:shadow-md transition)

**Verification Display:**
- Collapsible sections for hash comparison
- Monospace font for blockchain data
- Color-coded diff view (green for match, red for mismatch)
- Copy-to-clipboard buttons for hashes
- Visual checkmark/X indicators

**Voting Interface:**
- Clear three-column layout: Adopt | Reject | Abstain
- Large, touch-friendly vote buttons with icons
- Confirmation modal with transaction summary
- Step indicator showing: Select → Confirm → Sign → Submit
- Loading states with spinner and descriptive text
- Success confirmation with transaction hash

**Forms & Inputs:**
- Consistent input heights (h-12)
- Focus rings using primary color
- Helper text below inputs in text-sm
- Error states with red border and error message
- Dark mode: Inputs use surface color with proper contrast

**Empty States:**
- Centered illustration placeholder area
- Helpful message (text-lg text-secondary)
- Primary action button if applicable

**Documentation Panels:**
- Expandable FAQ accordion in sidebar
- Step-by-step guide with numbered badges
- Inline tooltips with question mark icons
- Dedicated "First Time Voting?" banner with guide link

### E. Animations

**Minimal & Purposeful:**
- Transition durations: transition-all duration-200 (fast UI feedback)
- Card hover: Subtle scale and shadow (hover:scale-[1.02])
- Modal entry: Fade + slide from center
- Loading spinners: Standard rotation animation
- Success states: Brief scale pulse (once)
- NO scroll-triggered animations
- NO decorative motion - only functional feedback

## Page Structure

**Main Dashboard:**
- Compact header with auth status (no hero image)
- Filter bar: Status dropdown, search by ID, sort options
- Proposal grid: 3 columns on desktop, 1 on mobile
- Pagination controls at bottom
- Sticky "How to Vote" help button (bottom-right)

**Proposal Detail Page:**
- Breadcrumb navigation
- Two-column layout: Proposal content (left 60%) | Voting panel (right 40%)
- Verification section expandable below content
- Related proposals footer

**First-Time Voter Guide:**
- Modal overlay or dedicated page
- 4-step visual walkthrough with screenshots
- Collapsible detailed explanations
- "Got it, take me to proposals" CTA

## Trust & Transparency Elements

- All on-chain data displayed with verification badges
- Hash comparisons always available (not hidden)
- Transaction confirmations show exact parameters before signing
- Open-source badge in footer with GitHub link
- Version number and last updated timestamp
- Clear indication of client-side signing vs server actions