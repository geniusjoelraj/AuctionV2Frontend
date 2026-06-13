# 🏏 IPL Auction V2 — Frontend

A real-time IPL-style cricket auction simulator built with **Next.js 16**, **React 19**, and **STOMP over WebSockets**. Teams bid on players live, with an admin panel controlling the game flow and a host view driving the on-screen auction experience.

> **Backend repo →** [AuctionV2](https://github.com/TheRealLeszkon/AuctionV2)

---

## 📸 Screenshots

> Place your screenshots in the `docs/screenshots/` directory and update the paths below.

| Screen | Preview |
|---|---|
| **Login** | ![Login](docs/screenshots/login.png) |
| **Host — Auction View** | ![Host Auction](docs/screenshots/host-auction.png) |
| **Host — Player Card** | ![Player Card](docs/screenshots/player-card.png) |
| **Host — Legend Card** | ![Legend Card](docs/screenshots/legend-card.png) |
| **Admin — Controls** | ![Admin Controls](docs/screenshots/admin-controls.png) |
| **Admin — Data Table** | ![Admin Data Table](docs/screenshots/admin-datatable.png) |
| **Team — Dashboard** | ![Team Dashboard](docs/screenshots/team-dashboard.png) |
| **Game Creation** | ![Game Creation](docs/screenshots/game-create.png) |
| **End Results** | ![End Results](docs/screenshots/end-results.png) |

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

## 🖼️ Screenshots

<img width="903" height="1030" alt="Screenshot 2026-06-13 at 6 54 21 PM" src="https://github.com/user-attachments/assets/6c5f8403-3f0a-457f-9bbb-1f11616a1a48" />
<img width="1470" height="919" alt="Screenshot 2026-06-13 at 7 08 41 PM" src="https://github.com/user-attachments/assets/8f02a730-10ab-44ea-bf79-7ec1a108e4da" />
<img width="5312" height="3022" alt="Screenshot 2026-06-13 at 7 15 22 PM" src="https://github.com/user-attachments/assets/8afaeb5b-aa88-4ad7-80f0-475e5a74ec24" />
<img width="1470" height="919" alt="Screenshot 2026-06-13 at 7 05 00 PM" src="https://github.com/user-attachments/assets/22d9906d-de1a-47fe-8240-143153ce7db6" />
<img width="712" height="1600" alt="WhatsApp Image 2026-06-13 at 9 24 05 PM" src="https://github.com/user-attachments/assets/00aca193-5bf5-40a9-9b34-b5c853e3a32b" />
<img width="712" height="1600" alt="WhatsApp Image 2026-06-13 at 9 24 05 PM (1)" src="https://github.com/user-attachments/assets/c386fae7-7f7d-47b0-b286-b117c7d4e709" />



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

## 🔑 Default Credentials

### Host

| Field | Value |
|---|---|
| **Username** | `host` |
| **Password** | `gta6` |

> The host login does **not** require a Room ID — it redirects straight to the game creation/management screen at `/create`.

### Admin

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `password` |
| **Room ID** | The game ID of an active game |

> The admin password is hardcoded as `"password"` when a game is created (see `GameCreate.tsx`).

### Team Passwords

Team passwords are **auto-generated by the backend** when a new game is created. To find them:

1. Log in as **Host** (username: `host`, password: `gta6`)
2. You'll land on the `/create` screen
3. Enter the **Game ID** in the "Start Game" form — this loads the game details
4. A **Team Passwords table** appears below the active games list, showing each team's **association name** and **password**
5. Share these credentials with the respective team captains

> The passwords are fetched from the backend via `GET /game/{gameId}` and are available in the `teamPasswords` field of the game object (each entry has `association` and `password`).

---

## 👥 Roles & Flows

### 🎙 Host
- Creates new auction games with team configurations and rules
- Drives the live auction — reveals players, manages bid flow
- Controls game lifecycle (Start → Finalize → End)
- **Views all team passwords** on the `/create` screen after entering a Game ID

### 🛡 Admin
- Purchases players on behalf of teams (manual override)
- Refunds incorrectly assigned players
- Views all team rosters and audit logs

### 🏟 Team
- Joins a game room via team code + password (provided by the host)
- Views their squad, balance, and player composition
- Selects substitutes during the finalization phase

---

## ⌨️ Keyboard Shortcuts

Press `Ctrl + /` to open the shortcuts dialog in the host view.

### Bidding (Host View)

| Key | Action |
|---|---|
| `↑` Arrow Up | Increase bid by current increment |
| `↓` Arrow Down | Decrease bid by current increment |
| `B` | Open custom bid dialog (enter exact amount) |
| `R` | Refund the current player |

> Bid increments scale automatically based on the current bid value.

### Player Navigation (Host View)

| Key | Action |
|---|---|
| `→` Arrow Right | Next player |
| `←` Arrow Left | Previous player |

### Player Type Filters (Host View)

| Key | Action |
|---|---|
| `1` | Filter by Batsman |
| `2` | Filter by Bowler |
| `3` | Filter by All Rounder |
| `4` | Filter by Wicket Keeper |

### Search

| Key | Action |
|---|---|
| `Ctrl + F` | Focus the player search bar |
| `Esc` | Unfocus / close the search bar |

### Utility

| Key | Action |
|---|---|
| `Ctrl + /` | Open keyboard shortcuts dialog |

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
