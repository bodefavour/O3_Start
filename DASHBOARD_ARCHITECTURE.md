# Dashboard Component Hierarchy

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         Dashboard.tsx                           │
│  ┌─────────────┬────────────────────────────────────────────┐  │
│  │             │                                            │  │
│  │  Sidebar    │         Main Content Area                  │  │
│  │  ────────   │  ┌──────────────────────────────────────┐ │  │
│  │             │  │     DashboardHeader.tsx               │ │  │
│  │ ▶ Dashboard │  │  "Dashboard"                          │ │  │
│  │   Wallet    │  │  "Welcome back to BorderlessPay"      │ │  │
│  │   Payments  │  └──────────────────────────────────────┘ │  │
│  │   Invoicing │                                            │  │
│  │   Payroll   │  ┌──────────────────────────────────────┐ │  │
│  │   Analytics │  │     BalanceCards.tsx                  │ │  │
│  │   Settings  │  │  ┌─────────────┬─────────────────┐   │ │  │
│  │             │  │  │Total Balance│ Monthly Volume  │   │ │  │
│  │             │  │  │ $67,980.76  │   $186,450      │   │ │  │
│  │             │  │  └─────────────┴─────────────────┘   │ │  │
│  │             │  └──────────────────────────────────────┘ │  │
│  │             │                                            │  │
│  │             │  ┌──────────────────────────────────────┐ │  │
│  │             │  │     QuickActions.tsx                  │ │  │
│  │             │  │  ┌──────┬────────┬──────────────┐    │ │  │
│  │             │  │  │ Send │Receive │Create Invoice│    │ │  │
│  │             │  │  │Money │        │              │    │ │  │
│  │             │  │  └──────┴────────┴──────────────┘    │ │  │
│  │             │  └──────────────────────────────────────┘ │  │
│  │             │                                            │  │
│  │             │  ┌────────────────┬─────────────────────┐ │  │
│  │             │  │ Transaction    │ Recent              │ │  │
│  │             │  │ Analytics.tsx  │ Transactions.tsx    │ │  │
│  │             │  │                │                     │ │  │
│  │             │  │  ┌──┐          │ • TechCorp Ltd      │ │  │
│  │             │  │  │  │          │ • Lagos Office      │ │  │
│  │             │  │  │  │  ┌──┐    │ • Global Suppliers  │ │  │
│  │ ─────────   │  │  │  │  │  │    │ • Client Invoice    │ │  │
│  │ Oba Vincent │  │  │  │  │  │┌─┐ │ • Vendor Payment    │ │  │
│  │ Premium Acc │  │  └──┘  └──┘│ │ │                     │ │  │
│  │             │  │  W1  W2 W3 W4│ │                     │ │  │
│  └─────────────┴──┴────────────┴──┴─────────────────────┴──┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Tree

```
Dashboard/
│
├── Sidebar
│   ├── Menu Items (7 buttons)
│   │   ├── Dashboard ✓ (active)
│   │   ├── Wallet
│   │   ├── Payments
│   │   ├── Invoicing
│   │   ├── Payroll
│   │   ├── Analytics
│   │   └── Settings
│   │
│   └── User Profile
│       ├── Avatar (OV)
│       ├── Name: "Oba Vincent"
│       └── Type: "Premium Account"
│
└── Main Content
    ├── DashboardHeader
    │   ├── Title: "Dashboard"
    │   └── Subtitle: "Welcome back to BorderlessPay"
    │
    ├── BalanceCards
    │   ├── Total Balance Card
    │   │   ├── Amount: "$67,980.76"
    │   │   └── Label: "Across all wallets"
    │   │
    │   └── Monthly Volume Card
    │       ├── Amount: "$186,450"
    │       └── Growth: "+12% from last month"
    │
    ├── QuickActions
    │   ├── Send Money Button (Primary)
    │   ├── Receive Button
    │   └── Create Invoice Button
    │
    └── Two-Column Grid
        ├── TransactionAnalytics (Left)
        │   ├── Title: "Transaction Analytics"
        │   └── Bar Chart (4 weeks)
        │       ├── Week1: 120px
        │       ├── Week2: 80px
        │       ├── Week3: 90px
        │       └── Week4: 140px
        │
        └── RecentTransactions (Right)
            ├── Title: "Recent Transactions"
            ├── "View All" Link
            └── Transaction List (5 items)
                ├── TechCorp Ltd (+2,500 USDC) ✓
                ├── Lagos Office (-₦450,000) ✓
                ├── Global Suppliers (+1,200 USDT) ✓
                ├── Client Invoice (+2,500 USDC) ✓
                └── Vendor Payment (-300 USD) ⏳
```

## Props Flow

```
Dashboard
    │
    ├─→ activeMenuItem: "dashboard"
    │   └─→ Sidebar (receives activeMenuItem)
    │
    └─→ handleNavigation(item: string)
        └─→ Sidebar (receives onNavigate callback)
```

## State Management

### Current State:
- **Local State** in `Dashboard.tsx`:
  - `activeMenuItem` - Tracks which sidebar item is active
  - `setActiveMenuItem` - Updates active menu item

### Future State (Recommended):
- User authentication status
- Balance data from API
- Transaction data from API
- User profile information
- Real-time updates via WebSocket

## Data Flow Example

```
User Click → Sidebar Component → onNavigate callback → 
Dashboard State Update → Re-render with new activeMenuItem → 
Sidebar shows new active state
```

## File Sizes (Approximate)

- `Dashboard.tsx` - Main container (40 lines)
- `Sidebar.tsx` - Navigation menu (70 lines)
- `DashboardHeader.tsx` - Header section (15 lines)
- `BalanceCards.tsx` - Balance display (40 lines)
- `QuickActions.tsx` - Action buttons (30 lines)
- `TransactionAnalytics.tsx` - Chart component (35 lines)
- `RecentTransactions.tsx` - Transaction list (80 lines)

**Total: ~310 lines of dashboard code**

## Styling Approach

All components use:
- **Tailwind CSS** for utility classes
- **Custom colors** matching design system
- **Responsive design** with `lg:` breakpoints
- **Inter font family** for typography
- **Consistent spacing** with Tailwind scale

## Interactive Elements

1. **Sidebar Menu Items**
   - Hover state: `hover:bg-white/10`
   - Active state: `bg-[#00c48c]`
   - Click handler: Updates `activeMenuItem`

2. **Quick Action Buttons**
   - Primary button: `bg-[#00c48c] hover:bg-[#00b37d]`
   - Secondary buttons: `variant="outline"`

3. **Recent Transactions**
   - Hover effect: `hover:bg-gray-50`
   - Clickable rows (ready for navigation)

4. **View All Link**
   - Hover underline effect
   - Ready for navigation to full transactions page

## Responsive Design

Current breakpoints:
- **Mobile** (< 768px): Single column layout
- **Tablet** (768px - 1024px): Responsive grid
- **Desktop** (> 1024px): Two-column grid for analytics

Sidebar:
- Desktop: Fixed width (176px)
- Mobile: Should convert to hamburger menu (future enhancement)

This structure keeps your dashboard clean, maintainable, and scalable! 🎨
