#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "=========================================================="
echo " Starting Apex Logistics & Enterprise Inventory System "
echo "=========================================================="

# Check and activate backend
cd "$DIR/backend"
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
    ./venv/bin/pip install -r requirements.txt
fi

echo "Verifying backend database & seeds..."
PYTHONPATH=. ./venv/bin/python3 app/db/seed.py

echo "Starting FastAPI Backend Server on http://127.0.0.1:8000..."
PYTHONPATH=. ./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Trap Ctrl+C to kill both services
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM

# Start frontend
cd "$DIR/frontend"
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "Starting Vite React Frontend on http://localhost:5173..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo " Services are live:"
echo "   - Web & Mobile Dashboard: http://localhost:5173"
echo "   - FastAPI Swagger Docs:    http://127.0.0.1:8000/docs"
echo "   - Health Check:            http://127.0.0.1:8000/health"
echo ""
echo "Press Ctrl+C to stop both servers."

wait
