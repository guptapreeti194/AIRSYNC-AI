#!/bin/bash
cd /app/backend

# Ensure no orphaned process from a previous restart is still bound to the port
pkill -9 -f "ts-node-dev.*main.ts" 2>/dev/null
sleep 1

for i in $(seq 1 60); do
  if mysqladmin -h 127.0.0.1 -P 3306 -u udaan_user -pUdaanSecure2026! ping >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

exec npm run dev
