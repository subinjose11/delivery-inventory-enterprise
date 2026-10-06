#!/usr/bin/env bash

echo "=========================================================="
echo " Stopping Apex Logistics Backend & Frontend Services "
echo "=========================================================="

# Find and terminate processes running on port 8000 (FastAPI) and port 5173 (Vite)
PIDS=$(lsof -ti:8000 -ti:5173 2>/dev/null || true)

if [ -n "$PIDS" ]; then
    echo "Terminating processes on ports 8000 and 5173 (PIDs: $PIDS)..."
    echo "$PIDS" | xargs kill -9 2>/dev/null || true
    echo "Processes terminated successfully."
else
    echo "No processes were found running on ports 8000 or 5173."
fi

# Additional safety cleanup for detached workers
pkill -f "uvicorn app.main:app" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

echo "All services stopped. Ports 8000 and 5173 are now free."
