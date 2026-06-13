# 🏏 IPL Auction V2 — Frontend

A real-time IPL-style cricket auction simulator built with **Next.js 16**, **React 19**, and **STOMP over WebSockets**. Teams bid on players live, with an admin panel controlling the game flow and a host view driving the on-screen auction experience.

> **Backend repo →** [AuctionV2](https://github.com/TheRealLeszkon/AuctionV2)

---

## ✨ Features

- **Real-time bidding** — WebSocket (STOMP/SockJS) powered live bid updates across all connected clients
- **Role-based views** — Separate interfaces for **Host**, **Admin**, **Team**, and **Spectator**
- **Custom player cards** — SVG-based cricket cards with player stats, country flags, and downloadable PNG exports
- **Game lifecycle management** — Create → Start → Auction → Finalize → End with full audit logging
- **Team management** — Balance tracking, squad composition rules (foreign caps, uncapped quotas, role-based slots)
- **Substitute selection** — Post-auction substitute lock-in phase before final results
- **Admin controls** — Purchase/refund players, override bids, manage game state
- **Keyboard shortcuts** — Arrow keys for quick bid increments during live auctions
- **Dark mode** — System-aware theming via `next-themes`
- **Docker ready** — Multi-stage Dockerfile for production deployment

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, RSC) |
| **UI** | React 19, Radix UI, shadcn/ui (New York style) |
| **Styling** | Tailwind CSS v4, CSS Variables |
| **Real-time** | STOMP.js + SockJS (WebSocket) |
| **State** | React hooks, localStorage |
| **HTTP** | Fetch API, Axios |
| **Data Tables** | TanStack React Table v8 |
| **Screenshots** | modern-screenshot (DOM → PNG) |
| **Icons** | Lucide React, React Icons |
| **Fonts** | Inter, Orbitron, Almendra (Google Fonts) |
| **Theming** | next-themes |
| **Language** | TypeScript 5 |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Login page (entry point)
│   ├── layout.tsx          # Root layout (fonts, theme provider)
│   ├── admin/              # Admin dashboard & team management
│   ├── card/               # Player card preview
│   ├── create/             # Game creation form
│   ├── host/               # Host auction view (bidding, player reveal)
│   └── team/               # Team view & end-game results
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui primitives
│   ├── AdminControls.tsx   # Purchase & refund controls
│   ├── Bid.tsx             # Live bidding interface with hotkeys
│   ├── PlayerCard.tsx      # SVG player card with stats
│   ├── DataTable.tsx       # TanStack-powered data tables
│   ├── GameCreate.tsx      # New game configuration form
│   ├── GameLogs.tsx        # Audit log viewer
│   ├── LoginPage.tsx       # Auth form with team selector
│   └── ...
├── types/                  # TypeScript type definitions
│   ├── api.ts              # API response types (Player, Team, Game, etc.)
│   ├── bid.ts              # Bid-related types
│   └── event.ts            # WebSocket event types
├── utils/                  # Utility functions
│   ├── api.ts              # REST API client (fetch wrappers)
│   ├── bid.ts              # Bid formatting & increment logic
│   └── constants.ts        # IPL team abbreviations
├── lib/                    # Shared library code
├── socket.ts               # STOMP WebSocket service (singleton)
└── style.css               # Custom styles
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** (recommended) or npm
- Backend server running on port `6769` — see [AuctionV2](https://github.com/TheRealLeszkon/AuctionV2)

### Installation

```bash
# Clone the repo
git clone git@github.com:geniusjoelraj/AuctionV2Frontend.git
cd AuctionV2Frontend

# Install dependencies
pnpm install
# or
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_HOST=localhost
```

> Set this to your backend server's hostname/IP in production.

### Development

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the app.

### Production Build

```bash
pnpm build && pnpm start
```

---

## 🐳 Docker

The project includes a multi-stage Dockerfile optimized for production:

```bash
# Build the image
docker build -t ipl-auction-frontend .

# Run the container
docker run -p 3000:3000 ipl-auction-frontend
```

---

## 👥 Roles & Flows

### 🎙 Host
- Creates new auction games with team configurations and rules
- Drives the live auction — reveals players, manages bid flow
- Controls game lifecycle (Start → Finalize → End)

### 🛡 Admin
- Purchases players on behalf of teams (manual override)
- Refunds incorrectly assigned players
- Views all team rosters and audit logs

### 🏟 Team
- Joins a game room via team code + password
- Views their squad, balance, and player composition
- Selects substitutes during the finalization phase

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `↑` Arrow Up | Increase bid by current increment |
| `↓` Arrow Down | Decrease bid by current increment |

> Bid increments scale automatically based on the current bid value.

---

## 🔌 WebSocket Architecture

The app uses a singleton `SocketService` class that manages STOMP connections over SockJS:

- **Auto-reconnect** with 5-second delay
- **Heartbeat** monitoring (4s intervals)
- **Pending subscription queue** — subscriptions made before connection is ready are queued and processed on connect
- **Topics** — `/app/game/{gameId}/bids` for bid publishing

---

## 📄 License

This project is for personal/educational use.
