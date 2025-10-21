# BorderlessPay - Application Routing Guide

## 📋 Current Application Flow

```
Landing Page → Registration → Verification → Dashboard
     (/)      →  (/register)  →  (/verify)   → (/dashboard)
```

## 🗺️ Route Structure

### 1. **Landing Page** - `/`
- **Component**: `MacbookPro`
- **Purpose**: Main marketing/landing page
- **Features**:
  - Hero section "Bank Beyond Borders"
  - Feature cards showcase
  - Multi-currency support information
  - Business needs section
  - "Get Started" and "Sign In" CTAs

### 2. **Business Registration** - `/register`
- **Component**: `RegisterBusiness`
- **Purpose**: New business account registration
- **Next Step**: `/verify`

### 3. **Business Verification** - `/verify`
- **Component**: `VerifyBusiness`
- **Purpose**: Verify business information and KYC
- **Next Step**: `/dashboard`

### 4. **Dashboard** - `/dashboard` ⭐ NEW
- **Component**: `Dashboard`
- **Purpose**: Main user dashboard after authentication
- **Features**:
  - Sidebar navigation with 7 menu items
  - Balance overview cards
  - Quick action buttons
  - Transaction analytics chart
  - Recent transactions list
  - User profile section

## 🎨 Dashboard Component Structure

```
Dashboard/
├── Dashboard.tsx                    # Main container
└── components/
    ├── Sidebar.tsx                  # Left navigation menu
    ├── DashboardHeader.tsx          # Top header with welcome message
    ├── BalanceCards.tsx             # Total balance & monthly volume cards
    ├── QuickActions.tsx             # Send/Receive/Invoice buttons
    ├── TransactionAnalytics.tsx     # Weekly analytics bar chart
    └── RecentTransactions.tsx       # Transaction list with status badges
```

## 🔄 Navigation Flow

### User Journey:
1. **First Visit** → Land on `/` (MacbookPro landing page)
2. **Click "Get Started"** → Navigate to `/register`
3. **Complete Registration** → Navigate to `/verify`
4. **Complete Verification** → Navigate to `/dashboard`
5. **Logged In Users** → Direct access to `/dashboard`

## 📱 Dashboard Features

### Sidebar Menu Items:
- ✅ Dashboard (active by default)
- 💳 Wallet
- 💸 Payments
- 📄 Invoicing
- 💰 Payroll
- 📊 Analytics
- ⚙️ Settings

### Quick Actions:
- **Send Money** - Primary action (green button)
- **Receive** - Secondary action
- **Create Invoice** - Secondary action

### Data Display:
- **Total Balance**: $67,980.76 (across all wallets)
- **Monthly Volume**: $186,450 (+12% from last month)
- **Transaction Analytics**: 4-week bar chart
- **Recent Transactions**: Latest 5 transactions with status

## 🔗 Adding Navigation Links

### Example: Navigate from Landing to Dashboard

In `MainHeaderSection.tsx`:
```tsx
import { useNavigate } from "react-router-dom";

export const MainHeaderSection = () => {
  const navigate = useNavigate();
  
  return (
    <header>
      <Button onClick={() => navigate("/register")}>
        Get Started
      </Button>
      <Button onClick={() => navigate("/dashboard")}>
        Sign In
      </Button>
    </header>
  );
};
```

### Example: Navigate from Verification to Dashboard

In `VerifyBusiness.tsx`:
```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// On successful verification:
navigate("/dashboard");
```

## 🚀 Testing Your Routes

You can test each route by navigating to:
- `http://localhost:5173/` - Landing page
- `http://localhost:5173/register` - Registration
- `http://localhost:5173/verify` - Verification
- `http://localhost:5173/dashboard` - Dashboard

## 🔐 Next Steps: Protected Routes

To protect the dashboard and ensure only logged-in users can access it:

1. **Create a Protected Route component**:
```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = false; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
```

2. **Wrap protected routes**:
```tsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 📊 Dashboard Customization

### Updating Balance Data:
Edit `BalanceCards.tsx` to connect to your API or state management.

### Adding More Transactions:
Edit the `transactions` array in `RecentTransactions.tsx`.

### Changing Analytics Data:
Edit the `weeklyData` array in `TransactionAnalytics.tsx`.

### Customizing Sidebar:
Edit the `menuItems` array in `Sidebar.tsx` to add/remove menu items.

## 🎯 Design Notes

- All components maintain the exact design from your Figma mockup
- Color scheme: 
  - Primary: `#00c48c` (Teal/Green)
  - Dark: `#0b1f3a` (Navy)
  - Background: `#f5f5f5` (Light gray)
- Typography: Inter font family
- All spacing and sizing match the original design

## 📝 File Summary

**New Files Created:**
- `src/screens/Dashboard/Dashboard.tsx`
- `src/screens/Dashboard/index.ts`
- `src/screens/Dashboard/components/Sidebar.tsx`
- `src/screens/Dashboard/components/DashboardHeader.tsx`
- `src/screens/Dashboard/components/BalanceCards.tsx`
- `src/screens/Dashboard/components/QuickActions.tsx`
- `src/screens/Dashboard/components/TransactionAnalytics.tsx`
- `src/screens/Dashboard/components/RecentTransactions.tsx`

**Modified Files:**
- `src/index.tsx` - Added dashboard route

Your dashboard is now fully integrated and ready to use! 🎉
