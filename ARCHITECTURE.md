# Café Zecchino - Complete System Architecture

## Overview

This is a **fully independent** cafe management system with an integrated website, table booking system, and PWA-based POS (Point of Sale) system. The architecture prioritizes **offline capability**, **data sync**, and **ease of operation**.

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   Website       │  │   POS Terminal  │  │   Admin Panel   │    │
│  │  (Public)       │  │  (Touch UI)     │  │  (Dashboard)    │    │
│  │                 │  │                 │  │                 │    │
│  │ - Menu Display  │  │ - Order Entry   │  │ - Reports       │    │
│  │ - Bookings      │  │ - Payments      │  │ - Menu Config   │    │
│  │ - Online Orders │  │ - Table Mgmt    │  │ - Settings      │    │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘    │
│           │                    │                    │              │
│           └────────┬───────────┴───────────┬────────┘              │
│                    ▼                       ▼                       │
│           ┌──────────────────────────────────────┐                │
│           │   Service Worker + IndexedDB        │                │
│           │   (Offline Storage & Sync Queue)    │                │
│           └──────────────────┬───────────────────┘                │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
                    ┌──────────▼────────────┐
                    │  Background Sync API  │
                    │  (Detects Connection)  │
                    └──────────┬─────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                    BACKEND LAYER (Next.js)                          │
├──────────────────────────────┼──────────────────────────────────────┤
│                              ▼                                      │
│  ┌────────────────────────────────────────────────────┐           │
│  │          API Routes (/app/api/*)                   │           │
│  │                                                    │           │
│  │  - /api/orders (create, read, sync)               │           │
│  │  - /api/bookings (reservations)                   │           │
│  │  - /api/menu (menu items, categories)             │           │
│  │  - /api/tables (table status)                     │           │
│  │  - /api/payments (Stripe/UK processors)           │           │
│  │  - /api/sync (offline sync endpoint)              │           │
│  │  - /api/auth (staff login)                        │           │
│  └────────────────────┬─────────────────────────────┘           │
│                       │                                            │
│  ┌────────────────────▼─────────────────────────────┐           │
│  │     Database Connection & Query Handler           │           │
│  │     (SQL queries with parameterization)           │           │
│  └────────────────────┬─────────────────────────────┘           │
│                       │                                            │
└───────────────────────┼────────────────────────────────────────────┘
                        │
┌───────────────────────┼────────────────────────────────────────────┐
│              PERSISTENCE LAYER                                     │
├───────────────────────┼────────────────────────────────────────────┤
│                       ▼                                            │
│  ┌──────────────────────────────┐  ┌─────────────────────────┐   │
│  │      Supabase / Neon          │  │  External Services      │   │
│  │   (PostgreSQL Database)        │  │                        │   │
│  │                              │  │  - Stripe Terminal       │   │
│  │  Tables:                      │  │  - GoCardless / Wise     │   │
│  │  - users                      │  │  - Email Service         │   │
│  │  - menu_items                 │  │  - SMS Notifications     │   │
│  │  - orders                     │  │  - Receipt Printers      │   │
│  │  - bookings                   │  │    (Web Serial API)      │   │
│  │  - tables                     │  │                        │   │
│  │  - payments                   │  │  - Card Readers         │   │
│  │  - sync_queue (offline)       │  │    (Web USB API)        │   │
│  │  - audit_log                  │  │                        │   │
│  └──────────────────────────────┘  └─────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Core Tables

#### `users`
```sql
- id (UUID, PK)
- email (VARCHAR, unique)
- password_hash (VARCHAR)
- full_name (VARCHAR)
- role (ENUM: 'owner', 'manager', 'staff', 'customer')
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `menu_items`
```sql
- id (UUID, PK)
- name (VARCHAR)
- description (TEXT)
- category (VARCHAR: 'Espresso', 'Cappuccino & Latte', 'Pastries', 'Food')
- price (DECIMAL)
- image_url (VARCHAR)
- is_available (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `orders`
```sql
- id (UUID, PK)
- order_number (INTEGER, auto-increment)
- type (ENUM: 'dine-in', 'takeaway', 'delivery')
- table_id (FK -> tables.id, nullable)
- status (ENUM: 'pending', 'preparing', 'ready', 'completed')
- subtotal (DECIMAL)
- tax (DECIMAL)
- total (DECIMAL)
- payment_method (ENUM: 'card', 'cash', 'contactless')
- payment_status (ENUM: 'pending', 'completed', 'failed')
- created_at (TIMESTAMP)
- completed_at (TIMESTAMP, nullable)
```

#### `order_items`
```sql
- id (UUID, PK)
- order_id (FK -> orders.id)
- menu_item_id (FK -> menu_items.id)
- quantity (INTEGER)
- price_at_time (DECIMAL)
- special_instructions (TEXT)
```

#### `bookings`
```sql
- id (UUID, PK)
- booking_number (INTEGER, auto-increment)
- customer_name (VARCHAR)
- customer_email (VARCHAR)
- customer_phone (VARCHAR)
- date (DATE)
- time (TIME)
- party_size (INTEGER)
- table_id (FK -> tables.id, nullable)
- status (ENUM: 'pending', 'confirmed', 'completed', 'cancelled')
- special_requests (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `tables`
```sql
- id (UUID, PK)
- table_number (INTEGER)
- capacity (INTEGER)
- status (ENUM: 'available', 'occupied', 'reserved')
- location (VARCHAR)
- created_at (TIMESTAMP)
```

#### `sync_queue` (For Offline Sync)
```sql
- id (UUID, PK)
- client_id (VARCHAR)
- action (ENUM: 'CREATE', 'UPDATE', 'DELETE')
- entity_type (VARCHAR: 'order', 'booking', etc)
- entity_id (UUID)
- payload (JSONB)
- is_synced (BOOLEAN)
- created_at (TIMESTAMP)
- synced_at (TIMESTAMP, nullable)
```

---

## Offline-First Strategy

### How It Works

1. **Local Storage (IndexedDB)**
   - Menu items cached on app load
   - Orders stored locally before internet connection
   - All operations work without network

2. **Sync Queue**
   - Pending transactions tracked in `sync_queue` table
   - Service Worker detects connection restoration
   - Background Sync API retries failed transactions

3. **Conflict Resolution**
   - Last-write-wins strategy for simple cases
   - Server validation to prevent duplicate orders
   - Timestamped entries for audit trail

### Offline Workflow

```
1. Staff creates order (no internet) → stored in IndexedDB
2. Order marked as "pending-sync" with offline timestamp
3. Internet returns → Service Worker detects connection
4. Background Sync API automatically syncs orders
5. Server validates & stores in database
6. Client receives confirmation & updates local cache
```

---

## UK Payment Integration

### Recommended Processors

1. **Stripe Terminal** (Primary - Most flexible)
   - Card present payments
   - Contactless/Apple Pay/Google Pay
   - Good API documentation
   - Works with Web APIs for integration

2. **GoCardless** (For Direct Debit)
   - UK-based, cost-effective
   - Great for repeat payments
   - Good for subscription handling

3. **Wise** (International Support)
   - Multi-currency support
   - Lower fees than traditional processors
   - Good for exports/imports

### Payment Flow

```
Customer presents payment method
         ↓
POS sends to selected processor
         ↓
Processor processes & returns status
         ↓
If approved:
  - Create payment record in DB
  - Update order status to "completed"
  - Print receipt
  - Sync to cloud if offline
         ↓
If declined:
  - Show error to staff
  - Allow retry
```

---

## Key Features

### 1. Website (`/` route)
- Public-facing cafe showcase
- Menu display with categories
- Table booking system
- Online ordering (future phase)
- Contact & location information

### 2. POS System (`/pos` route)
**Three Main Views:**

#### Dashboard (Order Entry)
- Left: Menu categories & quick buttons
- Right: Current order with items, quantities, totals
- Touch-optimized button sizing
- Works offline with IndexedDB

#### Tables View
- Visual table status: Available/Occupied/Reserved
- Guest count tracking
- Time spent at table monitoring
- Quick table status toggles

#### Order Queue (Kitchen Display)
- Pending orders waiting to be started
- Preparing orders in progress
- Ready orders awaiting pickup
- Time tracking for each stage

### 3. Admin Panel (`/pos/settings`)
- Store configuration (name, location, tax rate)
- Hardware setup (printers, card readers)
- Offline mode settings
- Auto-sync configuration
- Staff management

---

## Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend Framework** | Next.js 16 (App Router) | Modern, fast, PWA-ready, excellent for offline |
| **UI Components** | shadcn/ui + Tailwind CSS | Beautiful, accessible, fully customizable |
| **State Management** | React hooks + Context | Simple, no external dependencies needed |
| **Database** | Supabase (PostgreSQL) | Real-time, auth built-in, free tier available |
| **Database Alt** | Neon (serverless PostgreSQL) | Alternative if Supabase unavailable |
| **Authentication** | Custom JWT (Server Session) | Control over staff permissions |
| **Payments** | Stripe Terminal + GoCardless API | UK payment processing |
| **Offline Storage** | IndexedDB + Service Worker | Native browser APIs, works offline |
| **Sync** | Background Sync API | Automatic retry when online |
| **Hardware Integration** | Web Serial API + Web USB | Receipt printers, card readers |
| **Hosting** | Vercel | Zero-config deploy, global CDN, serverless |

---

## Development Phases

### Phase 1 (Current) - MVP
- [x] Website with menu & bookings
- [x] POS dashboard prototype
- [ ] Database integration (Supabase)
- [ ] Real offline sync
- [ ] Payment processing

### Phase 2 - Production Ready
- [ ] Staff authentication & permission system
- [ ] Real receipt printer integration
- [ ] Card reader API integration
- [ ] Kitchen display system refinement
- [ ] Advanced reporting & analytics

### Phase 3 - Advanced Features
- [ ] Delivery management
- [ ] Loyalty program
- [ ] Inventory management
- [ ] Customer profiles
- [ ] Dynamic pricing

---

## Security Considerations

### Authentication
- Staff login with email/password
- JWT tokens with 1-hour expiration
- Refresh tokens stored in HTTP-only cookies
- Role-based access control (RBAC)

### Data Protection
- All API endpoints require authentication
- Parameterized SQL queries (prevent SQL injection)
- Input validation on client & server
- HTTPS only in production

### Payment Security
- PCI DSL compliance through Stripe/processors
- No card data stored locally
- Encrypted payment tokens
- Audit log for all transactions

---

## Deployment

### Current Preview
- This prototype runs on Vercel
- Visit `/` for website
- Visit `/pos` for POS (staff area)
- Visit `/pos/settings` for configuration

### Production Deployment
1. Connect Supabase database
2. Set environment variables for payment processors
3. Deploy to Vercel (1-click button in v0)
4. Staff access via password-protected `/pos` route
5. Public website available immediately

---

## Transition from Mealzo

### What You Keep
- Your cafe brand & reputation
- Menu content
- Customer data (we can import)

### What Changes
- No more Mealzo platform fees (~2-3%)
- You own the entire system
- Full control over pricing & policies
- Direct customer data access

### Migration Steps
1. Import menu from current Mealzo setup
2. Set up Supabase database
3. Configure payment processor
4. Train staff on new POS system
5. Run parallel systems during transition
6. Switch off Mealzo when stable

---

## Next Steps

1. **Choose Database**: Supabase (recommended) or Neon
2. **Configure Payments**: Stripe + GoCardless or SumUp
3. **Hardware Setup**: Receipt printer & card reader model selection
4. **Staff Training**: 1-2 hours on POS system
5. **Launch**: Website goes live immediately, POS when ready

---

## Support & Maintenance

### Getting Help
- All code is on GitHub (you own it)
- Vercel provides 24/7 hosting support
- Supabase has active community
- Payment processors have support teams

### Ongoing Costs (Estimated)
- Vercel hosting: Free tier or $20/month
- Supabase: Free tier (~100GB data) or pay-as-you-go
- Stripe Terminal: 2.5% + 30p per transaction
- Domain: £10-15/year

---

## Architecture Decisions

### Why PWA Instead of Native App?
- Works on any device (iPad, Android, Web)
- Single codebase (cost savings)
- Offline by design
- No app store approval needed
- Easier updates

### Why Supabase Over Other Databases?
- Real-time sync capabilities
- Built-in auth (saves development time)
- PostgreSQL (powerful & proven)
- Generous free tier
- European data centers

### Why UK Payment Processors?
- Comply with local regulations
- Lower fees than international processors
- Better customer support for UK businesses
- Faster settlement times
- Support local economy

---

## Monitoring & Analytics

Future enhancements can include:
- Real-time dashboard of sales
- Staff performance metrics
- Peak hours analysis
- Menu popularity tracking
- Customer retention metrics
- Inventory level warnings

---

Generated with v0 - Production-Ready Architecture
