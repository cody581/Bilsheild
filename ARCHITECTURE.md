# BillShield Architecture Plan

## Overview
BillShield is an automated bill negotiation service. It connects to users' bank accounts via Plaid, identifies recurring bills, and facilitates lower rates through automated or semi-automated negotiations.

## Core Components

### 1. Frontend (React + Vite)
- **Waitlist/Landing Page**: Already built.
- **User Dashboard**: Shows connected accounts and detected bills.
- **Plaid Link Integration**: Securely connects user bank accounts.
- **Negotiation UI**: Allows users to authorize negotiations for specific bills.

### 2. Backend (Node.js + Express)
- **API Server**: Handles authentication, Plaid token exchange, and CRUD for bills/negotiations.
- **Bill Detection Engine**: Interfaces with Plaid API to fetch and process recurring transaction data.
- **Negotiation Manager**: Tracks the status of ongoing negotiations.

### 3. Database (SQLite)
- **users**: User profiles and authentication.
- **plaid_items**: Stores access tokens and metadata for connected bank accounts.
- **recurring_bills**: Records of detected recurring transactions (potential bills).
- **negotiations**: Tracking state and outcomes of negotiation attempts.

## Data Model

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plaid_items (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    access_token TEXT NOT NULL,
    item_id TEXT NOT NULL,
    institution_name TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE recurring_bills (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    plaid_item_id TEXT NOT NULL,
    merchant_name TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    frequency TEXT, -- monthly, annual, etc.
    category TEXT,
    last_date DATE,
    status TEXT DEFAULT 'detected', -- detected, ignored, negotiating, completed
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plaid_item_id) REFERENCES plaid_items(id)
);

CREATE TABLE negotiations (
    id TEXT PRIMARY KEY,
    bill_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, in_progress, success, failed
    original_amount DECIMAL(10, 2),
    negotiated_amount DECIMAL(10, 2),
    monthly_savings DECIMAL(10, 2),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES recurring_bills(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## End-to-End Workflow

1. **Onboarding**: User signs up and connects their bank via Plaid Link.
2. **Token Exchange**: Frontend sends `public_token` to Backend. Backend exchanges it for an `access_token` and saves it.
3. **Bill Detection**:
    - Backend calls Plaid `/transactions/recurring/get`.
    - Plaid identifies recurring streams (outflows).
    - Backend filters these streams (e.g., ignores small amounts, focus on high-yield categories like 'Utilities', 'Subscription').
    - Streams are saved to `recurring_bills`.
4. **User Review**: User sees a list of detected bills on their dashboard.
5. **Negotiation**:
    - User clicks "Lower my bill".
    - A `negotiation` record is created.
    - (Future) Backend triggers an automated negotiation script or alerts a human agent.
6. **Completion**: Once negotiated, the user is notified of the savings.

## Plaid Integration Details
- **Environment**: Sandbox (for development)
- **Product**: `transactions`
- **Key Endpoint**: `/transactions/recurring/get`
