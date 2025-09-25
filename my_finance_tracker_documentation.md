# Project Documentation

## Project Title

MyFinance Tracker –  Personal Finance Manager

## Project Overview

MyFinance Tracker is a Progressive Web App (PWA) for managing personal finances  with optional cloud sync via Supabase. Users can track expenses, income, savings, investments, assets, debts, and financial goals.

### Key Principle

Manual logs only: No automatic logs; entries are created when the user acts.

Debt/Liability payments include due scheduling and marking paid.

### Target Users

- Individuals managing daily finances
- Freelancers and small business owners
- Students or young professionals

### Stack

- **Frontend**: React 19 + Vite
- **Backend / Cloud**: Supabase
<!-- - **Offline Storage**: IndexedDB (idb library) -->
- **UI/UX**: TailwindCSS or Material UI

## Modules & Features

### 1. Dashboard

**Purpose**: Overview of all financial data.

**User Actions**:
- View summaries of income, expenses, savings, assets, and liabilities
- Track upcoming payments or recurring EMIs
- Monitor progress of financial goals

**Features**:
- Summary cards: Income, Expenses, Savings, Assets, Liabilities
- Charts: weekly/monthly trends
- Alerts: upcoming payments

**Example**:
- Upcoming EMI: Car Loan EMI - 5th Oct - ₹5000

### 2. Expenses

**Purpose**: Track all money going out, including debt payments.

**User Actions**:
- Add daily/general expenses manually
- Record EMIs, loans, credit card payments, borrowed/lent money
- Mark debt payments as paid for a date, period, or fully

#### Submodules & Features

#### 2.1 General Expenses
- Daily purchases like groceries, bills, transport
- Recurring payments (subscriptions, rent)
- Export reports (CSV/PDF)

**Example**:
- Bread & Butter: ₹25, Paid Cash
- Dinner ₹400 via GPay

#### 2.2 Debt & Liability Payments
**Purpose**: Manage all borrowings and obligations.

**User Actions**:
- Create new liability (loan, borrowed money, credit card)
- Set due schedule (monthly, custom dates)
- Mark payment as done for current month, specific date, or fully paid
- View remaining balance and past payments

**Features**:
- Create Liability: Record loan/borrowed amount, lender, interest (optional), due dates
- Payment Buttons:
  - Mark Paid for Current Period
  - Mark Paid for Specific Date
  - Mark Fully Paid
- Logs: Only generated when user clicks one of the payment buttons
- Alerts for due/overdue payments

**Example**:
- Car Loan: ₹50,000, EMI ₹5,000, Due 5th of every month
- User clicks Mark Paid → Log created for current month
- Borrowed ₹2,000 from Friend, Due 30-Sep
- Partial payment made → Log updated, remaining balance visible

#### 2.3 Expected / Planned Expenses
- Add planned future expenses
- Categorize as essential or optional

**Example**:
- Medical Checkup ₹1500 next month

### 3. Income

**Purpose**: Track money coming in.

**User Actions**:
- Add income manually: salary, freelance, rent, investment returns
- Categorize income
- Recurring income logged manually on receipt

**Features**:
- Summary of income by period
- Charts for income sources

**Examples**:
- Salary: ₹50,000 received on 25-Sep-2025
- Freelance Project: ₹10,000 received online

### 4. Savings

**Purpose**: Track saved money.

**User Actions**:
- Add savings account, wallet, or fixed deposit
- Log contributions manually

**Submodules & Features**:
- Types: Bank, Cash, Fixed Deposits
- Milestones: Manual progress notifications
- History Tracking: Contribution logs

**Example**:
- FD ₹20,000 created on 01-Sep-2025

### 5. Investments

**Purpose**: Track invested money.

**User Actions**:
- Add investment type, amount, expected returns
- Track value manually

**Features**:
- Performance dashboard
- Manual alerts for maturity or milestones

**Example**:
- Mutual Fund ₹10,000 added on 15-Sep-2025

### 6. Assets & Properties

**Purpose**: Track valuables.

**User Actions**:
- Add properties and assets
- Record optional notes for rent, resale, or maintenance

**Example**:
- House: 3BHK, Value ₹50,00,000
- Car: ₹7,00,000, Next service 1-Oct-2025

### 7. Financial Goals

**Purpose**: Track personal financial milestones.

**User Actions**:
- Create goals with target amount and deadline
- Update progress manually based on payments, savings, or investments

**Features**:
- Link to Savings, Investments, or Expenses
- Manual milestone updates
- Visual dashboard for progress

**Example**:
- Goal: Buy Car ₹5,00,000, Saved ₹2,00,000

### 8. Reports & Analytics

**Purpose**: Analyze finances.

**User Actions**:
- View reports by week/month/year
- Compare spending categories
- Monitor net worth

**Features**:
- Graphs: pie, bar, line
- Export as PDF/CSV

**Example**:
- Expenses Sept 2025: ₹20,000; Food ₹5,000; Bills ₹8,000

### 9. Settings & Profile

**Purpose**: Customize app.

**User Actions**:
- Update profile, currency, language, date format
- Backup/sync data manually
- Enable security PIN/password

## Logging Principles

- No automatic logs.
- Logs only when user performs an action:
  - EMI installment paid → log created
  - Subscription renewed → log created on button click
  - General expense: logged immediately if paid; pending if deferred

## Folder / Module Structure

```
myfinance-tracker/
│
├─ public/
│
├── src
│   ├── App.jsx
│   ├── assets
│   │   ├── css
│   │   │   └── index.css
│   │   └── images
│   │       └── auth
│   │           └── Forgot password-cuate.png
│   ├── features
│   │   ├── assets
│   │   │   ├── assetsSlice.js
│   │   │   └── components
│   │   │       ├── AssetsList.jsx
│   │   │       └── AssetsPage.jsx
│   │   ├── auth
│   │   │   ├── authSlice.js
│   │   │   └── components
│   │   │       ├── Login.jsx
│   │   │       └── RegisterAccount.jsx
│   │   ├── common
│   │   │   ├── commonSlice.js
│   │   │   ├── components
│   │   │   │   ├── InstallApp.jsx
│   │   │   │   ├── NotFoundPage.jsx
│   │   │   │   ├── ThemeToggle.jsx
│   │   │   │   └── UnAuthorized.jsx
│   │   │   └── layouts
│   │   │       ├── Footer.jsx
│   │   │       ├── Header.jsx
│   │   │       └── Main.jsx
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   │   └── DashboardPage.jsx
│   │   │   └── dashboardSlice.js
│   │   ├── expenses
│   │   │   ├── components
│   │   │   │   ├── ExpensesList.jsx
│   │   │   │   └── ExpensesPage.jsx
│   │   │   └── expensesSlice.js
│   │   ├── goals
│   │   │   ├── components
│   │   │   │   ├── GoalsList.jsx
│   │   │   │   └── GoalsPage.jsx
│   │   │   └── goalsSlice.js
│   │   ├── guest
│   │   │   └── components
│   │   │       └── GetStartedPage.jsx
│   │   ├── income
│   │   │   ├── components
│   │   │   │   ├── IncomeList.jsx
│   │   │   │   └── IncomePage.jsx
│   │   │   └── incomeSlice.js
│   │   ├── investments
│   │   │   ├── components
│   │   │   │   ├── InvestmentsList.jsx
│   │   │   │   └── InvestmentsPage.jsx
│   │   │   └── investmentsSlice.js
│   │   ├── reports
│   │   │   ├── components
│   │   │   └── ReportsPage.jsx
│   │   └── savings
│   │       ├── components
│   │       │   ├── SavingsList.jsx
│   │       │   └── SavingsPage.jsx
│   │       └── savingsSlice.js
│   ├── main.jsx
│   ├── routes
│   │   ├── index.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services
│   │   └── supabaseClient.js
│   ├── store
│   │   └── store.js
│   └── utils
│       ├── currencyUtils.js
│       ├── dateUtils.js
│       └── notifications.js
├── vercel.json
└── vite.config.js

```

# related to folder structure[why we seperated slice in three pieaces like services,thunks .]

# Work flow : slice->thunk->services.
# explanation: slices uses thunks and thunks call services function, read below details for better understanding.

- **Separation of Concerns**: Slice/thunk handles state, services handle API calls. Cleaner and easier to read.
- **Reusability**: Multiple thunks/components can use the same service function without duplicating code.
- **Easier Testing**: You can mock service functions without touching Redux logic.
- **Consistency**: Central place for all API logic — easy to add headers, auth tokens, error handling.
- **Scalability**: If you switch backend (Supabase → Firebase → REST API), only services need updates. Slice/thunks stay the same.

# Example:
# Debt/Liability Module

- **Thunk**: `markDebtPaidThunk`
  - **Service used**: `updatePaymentStatusAPI()`
  - **Purpose**: Mark a single due as paid.

- **Thunk**: `markCreditCardBillPaidThunk`
  - **Service used**: `updatePaymentStatusAPI()` (same service as above)
  - **Purpose**: Mark monthly credit card bill as paid.

# Both thunks use the same `updatePaymentStatusAPI()` but with different payloads.