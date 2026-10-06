# Apex Logistics & Enterprise Inventory Operations Suite

## Project Overview
Apex Logistics is a full-stack enterprise web application delivering two core operational capabilities:
1. **Delivery Operations Dashboard**: Fleet performance monitoring tracking operational KPIs, hourly delivery completion curves, status filtering, and driver dispatch milestone audit trails.
2. **Enterprise Inventory Management System**: Centralized product catalog supporting full CRUD operations, strict SKU uniqueness validation, real-time stock alerts, dynamic multi-field search, category filtering, and server-side pagination.

---

## Project Structure

```text
delivery-inventory-enterprise/
├── backend/
│   ├── app/
│   │   ├── api/             # FastAPI routers & versioned endpoints (/deliveries, /products)
│   │   ├── core/            # Database engine, app configuration, exceptions & logging
│   │   ├── data/            # In-memory mock delivery dispatches
│   │   ├── db/              # SQLite connection & product seed engine
│   │   ├── models/          # SQLAlchemy entity models (Product)
│   │   ├── repositories/    # Feature-based data access repositories
│   │   ├── schemas/         # Pydantic validation schemas & DTOs
│   │   ├── services/        # Business logic & domain services
│   │   └── main.py          # FastAPI application factory & middleware setup
│   ├── tests/               # Pytest automated test suites
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios client instance & TanStack Query keys
│   │   ├── components/      # UI primitives (Buttons, Modals, Badges) & HeaderNav
│   │   ├── features/
│   │   │   ├── delivery-dashboard/  # KPIs, Trend charts, Orders feed, Drawers
│   │   │   └── inventory/           # Product tables, Search filters, CRUD modals
│   │   ├── layouts/         # Web and responsive mobile layouts
│   │   ├── App.tsx          # Root application component & view switcher
│   │   └── main.tsx         # React root & QueryClient provider
│   ├── package.json         # Node.js dependencies & build scripts
│   └── vite.config.ts       # Vite bundler configuration
│
├── run_dev.sh               # Single-command dev launcher
├── stop_dev.sh              # Single-command port & process stopper
└── restart_dev.sh           # Clean restart script
```

---

## Setup & Running

### Option 1: Automated Launch (Recommended)
Run the launcher script from the root folder:

```bash
chmod +x run_dev.sh stop_dev.sh restart_dev.sh
./run_dev.sh
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend Swagger API**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Backend Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### Option 2: Manual Setup

#### 1. Backend (FastAPI on Port 8000)
```bash
cd backend

# Create & activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed initial product database
PYTHONPATH=. python3 app/db/seed.py

# Start FastAPI server
PYTHONPATH=. uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### 2. Frontend (Vite on Port 5173)
```bash
cd frontend

# Install packages
npm install

# Start Vite dev server
npm run dev
```

---

## How to Stop Running Ports

### Option 1: Using the Stop Script (Recommended)
Terminate all processes bound to **Port 8000** (FastAPI) and **Port 5173** (Vite):

```bash
./stop_dev.sh
```

### Option 2: Direct Command Line (macOS / Linux)
```bash
# Free both Frontend (5173) and Backend (8000) ports
lsof -ti:8000 -ti:5173 | xargs kill -9

# Stop Backend only (Port 8000)
lsof -ti:8000 | xargs kill -9

# Stop Frontend only (Port 5173)
lsof -ti:5173 | xargs kill -9
```

### Option 3: Terminal Foreground
If running in an interactive terminal, press `Ctrl + C`.

### Verify Ports Are Free
```bash
lsof -i :8000 -i :5173
```
*(No output indicates ports are clear).*

---

## How to Restart

### Option 1: Automated Restart Script (Recommended)
Stops running ports, cleans up background processes, and restarts both services:

```bash
./restart_dev.sh
```

### Option 2: Manual Restart
```bash
./stop_dev.sh
./run_dev.sh
```
