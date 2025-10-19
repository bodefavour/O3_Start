# Project Structure Documentation

## Overview
This is a React + TypeScript project using Vite, originally generated from Figma via Bolt. The project has been restructured to include proper routing while maintaining all original designs.

## File Structure

```
O3_Start/
├── src/
│   ├── index.tsx              # Entry point - renders App component
│   ├── App.tsx                # Main app with routing configuration
│   ├── components/
│   │   └── ui/                # Reusable UI components (shadcn/ui)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── separator.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   └── screens/
│       └── MacbookPro/        # Landing page screen
│           ├── index.ts
│           ├── MacbookPro.tsx # Main landing page component
│           └── sections/       # Page sections
│               ├── BusinessNeedsSection/
│               ├── FeaturesSection/
│               ├── HeaderSection/
│               ├── MainHeaderSection/
│               └── MultiCurrencySupportSection/
├── public/                    # Static assets (images, icons, etc.)
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## Routing Structure

### Current Routes
- **`/`** - Home/Landing Page (`MacbookPro` component)

### How Routing Works

1. **`src/index.tsx`** - The application entry point
   - Renders the `App` component inside React's StrictMode
   - Mounts to the `#app` div in `index.html`

2. **`src/App.tsx`** - Main application component with routing
   - Wraps the app in `BrowserRouter` from `react-router-dom`
   - Defines all routes using `Routes` and `Route` components
   - Currently routes to the `MacbookPro` landing page

3. **`src/screens/MacbookPro/MacbookPro.tsx`** - Landing page
   - Main landing page component
   - Composes multiple sections into a cohesive page

## Page Sections

The `MacbookPro` landing page is composed of several sections:

1. **MainHeaderSection** - Top navigation with logo and CTA buttons
2. **FeaturesSection** - Hero section with "Bank Beyond Borders" headline
3. **Everything Your Business Needs** - Feature cards grid (inline in MacbookPro.tsx)
4. **Multi-Currency Support** - Currency support heading (inline)
5. **BusinessNeedsSection** - Business-focused content
6. **HeaderSection** - Additional header content
7. **MultiCurrencySupportSection** - Detailed currency information

## Adding New Routes

To add a new page/route:

1. Create a new screen component in `src/screens/`:
   ```tsx
   // src/screens/About/About.tsx
   export const About = () => {
     return <div>About Page</div>;
   };
   ```

2. Import it in `src/App.tsx`:
   ```tsx
   import { About } from "./screens/About";
   ```

3. Add the route:
   ```tsx
   <Route path="/about" element={<About />} />
   ```

## Navigation Between Pages

To navigate between pages, use the `Link` component from `react-router-dom`:

```tsx
import { Link } from "react-router-dom";

<Link to="/about">About Us</Link>
```

Or programmatically with `useNavigate`:

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/about");
```

## UI Components

The project uses **shadcn/ui** components with Tailwind CSS:
- `Button` - Styled button with variants
- `Card` / `CardContent` - Card containers
- `Badge` - Label badges
- `Separator` - Visual dividers

All components support Tailwind CSS classes for customization.

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives

## Design Preservation

All original designs from the Figma import have been preserved. The routing structure is purely organizational and doesn't affect the visual appearance or layout of any components.
