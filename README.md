# E-Commerce Test Automation Suite (Sauce Demo Store)

> Robust End-to-End & Functional Automation Framework built with **Playwright** and **TypeScript**, targeting the Shopify storefront [`sauce-demo.myshopify.com`](https://sauce-demo.myshopify.com/).

---

## 🎯 Project Overview

This repository is an automation testing portfolio designed to simulate real-world QA engineering practices on an active e-commerce application. Rather than using simplified "toy" web apps, this suite tests a live Shopify store running a legacy liquid theme (`Simple OLD`), handling real network latency, dynamic DOM updates, and Shopify Storefront REST APIs.

### Key Highlights
- **Page Object Model (POM) + Component Architecture**: Decoupled page representations with shared reusable components (`HeaderNav`).
- **Custom Test Fixtures**: Extends Playwright's core `test` runner with pre-injected page instances to keep spec files clean and strictly typed.
- **Deterministic Synchronization**: Avoids arbitrary `page.waitForTimeout()` in favor of event-driven response interception (`waitForResponse` for `/cart/add.js`).
- **Hybrid UI & API Coverage**: Combines browser user flows with direct REST API contract checks for `/cart.js` and `/cart/add.js`.
- **CI/CD Ready**: Configured with GitHub Actions workflow, artifacts archiving, and multi-browser configurations.

---

## 🏗️ Project Architecture

```text
├── .github/
│   └── workflows/
│       └── playwright.yml         # CI workflow with multi-browser & artifact archiving
├── src/
│   ├── components/
│   │   └── HeaderNav.ts           # Header navigation bar component
│   ├── data/
│   │   └── testData.ts            # Deterministic test fixtures & scenarios
│   ├── fixtures/
│   │   └── test.fixture.ts        # Custom fixture extending Playwright test
│   ├── pages/
│   │   ├── BasePage.ts            # Abstract base page with shared navigation & waits
│   │   ├── HomePage.ts            # Landing page interactions & featured items
│   │   ├── CatalogPage.ts         # Collection grid & card navigation
│   │   ├── ProductDetailPage.ts   # Product attributes, price parser, add to cart
│   │   ├── CartPage.ts            # Cart verification, line items, checkout trigger
│   │   ├── LoginPage.ts           # Customer authentication & form validation
│   │   └── SearchPage.ts          # Storefront search execution & query filtering
│   ├── types/
│   │   └── index.ts               # Core TypeScript interfaces (ProductItem, Scenarios)
│   └── utils/
│       └── helpers.ts             # Price sanitizers and data helpers
├── tests/
│   ├── api/
│   │   └── cart-api.spec.ts       # Storefront REST cart endpoint tests
│   ├── e2e/
│   │   └── checkout-journey.spec.ts # Full customer purchase lifecycle
│   └── functional/
│       ├── auth-validation.spec.ts
│       ├── catalog-browsing.spec.ts
│       ├── product-details.spec.ts
│       └── search-validation.spec.ts
├── playwright.config.ts           # Playwright runners, reporters, viewport settings
├── package.json
└── tsconfig.json
```

---

## ⚡ Prerequisites

- **Node.js**: `v18.x` or higher (tested on Node v20/v24)
- **npm**: `v9.x` or higher

---

## 🚀 Cara Menjalankan Test (Execution Guide)

### 1. Clone & Install Dependencies
```bash
# Clone repository
git clone <repository-url>
cd "Project Automation"

# Install package dependencies
npm install

# Download browser binaries
npx playwright install chromium
```

### 2. Menjalankan Seluruh Test Suite
```bash
# Menjalankan seluruh test secara headless (Chromium)
npm run test:chromium
```

### 3. Menjalankan dengan Tampilan Browser Terbuka (Headed Mode)
Sangat berguna untuk presentasi atau melihat interaksi browser secara live:
```bash
npm run test:headed
```

### 4. Menjalankan Menggunakan Playwright Interactive UI Mode
Rekomendasi untuk visual inspection, time-travel debugging, dan locator playground:
```bash
npm run test:ui
```

### 5. Menjalankan Suite Tertentu
```bash
# Hanya jalankan E2E Checkout Flow
npm run test:e2e

# Hanya jalankan functional tests (Catalog, Search, Auth, Details)
npm run test:functional

# Hanya jalankan Storefront API tests
npm run test:api
```

### 6. Melihat HTML Report & Traces
Setelah test selesai dijalankan, Playwright secara otomatis membuat laporan interaktif:
```bash
npm run test:report
```

---

## 🧪 Test Coverage Matrix

| Test Suite | File | Focus Areas |
| :--- | :--- | :--- |
| **E2E Journey** | [`checkout-journey.spec.ts`](file:///tests/e2e/checkout-journey.spec.ts) | Homepage ➔ Catalog ➔ Select Product ➔ Pricing Verification ➔ Add to Cart ➔ Cart Badge Sync ➔ Cart Line Item Check ➔ Checkout CTA Readiness |
| **Catalog** | [`catalog-browsing.spec.ts`](file:///tests/functional/catalog-browsing.spec.ts) | Collection grid rendering, item count integrity, featured products carousel |
| **Product Details** | [`product-details.spec.ts`](file:///tests/functional/product-details.spec.ts) | Price consistency against metadata, variant selectors, asynchronous drawer counter sync |
| **Search** | [`search-validation.spec.ts`](file:///tests/functional/search-validation.spec.ts) | Search query matching, result count assertion, empty state handling for non-existent keywords |
| **Authentication** | [`auth-validation.spec.ts`](file:///tests/functional/auth-validation.spec.ts) | Form validation on bad credentials, route protection, registration redirection |
| **API Contract** | [`cart-api.spec.ts`](file:///tests/api/cart-api.spec.ts) | Direct HTTP validation on Shopify Storefront endpoints (`/cart.js`, `/cart/add.js`) |

---

## 💡 Technical Challenges & Solutions (Real-world QA Observations)

1. **Shopify AJAX Cart Synchronization**
   - *Problem*: In Shopify legacy themes, clicking "Add to Cart" triggers an asynchronous AJAX POST to `/cart/add.js`. Navigating immediately or asserting elements causes test flakiness.
   - *Solution*: Implemented `Promise.all([page.waitForResponse(...), button.click()])` inside `ProductDetailPage.addToCart()` to ensure the browser and server are 100% synchronized before moving forward.

2. **Non-Semantic DOM Structure in Legacy Themes**
   - *Problem*: The target store theme utilizes unconventional heading hierarchy (`h1#logo` containing empty brand anchors, with product names also assigned `h1` and prices assigned `h2`).
   - *Solution*: Utilized scoped locators with CSS negation (`h1:not(#logo)`) and role-based matching rather than brittle XPath or text-matching locators.

3. **Multi-Platform Responsiveness**
   - *Problem*: The theme hides desktop nav items and switches to a collapsible drawer on mobile viewports (`#toggle-menu`).
   - *Solution*: Provided device projects (`mobile-chrome` via Playwright configuration) and abstract component methods that handle responsive viewport state.

---

## ⚙️ CI/CD Pipeline

The test suite runs automatically on push and pull requests via **GitHub Actions** (`.github/workflows/playwright.yml`):
- Runs clean dependency installation via `npm ci`.
- Executes headless tests against `chromium`.
- Packages and publishes `playwright-report` as workflow artifacts (retained for 14 days) with failure screenshots and video recordings.

---

## 👨‍💻 Author

**Ihsan** - Software Quality Assurance / Test Automation Engineer
- Framework: Playwright Test Runner + TypeScript
- Target App: Shopify Sauce Demo Store
