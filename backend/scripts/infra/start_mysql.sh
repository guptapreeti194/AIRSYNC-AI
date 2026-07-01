#!/bin/bash

DATA_DIR="/app/.infra/mysql-data"
SOCK="/run/mysqld/mysqld.sock"
mkdir -p /app/.infra

cleanup() {
  if [ -n "$MYSQL_PID" ]; then
    kill -TERM "$MYSQL_PID" 2>/dev/null
    wait "$MYSQL_PID" 2>/dev/null
  fi
  exit 0
}
trap cleanup SIGTERM SIGINT

if ! command -v mariadbd >/dev/null 2>&1; then
  echo "[mysql-bootstrap] installing mariadb-server..."
  apt-get update -qq
  apt-get install -y -qq mariadb-server mariadb-client
fi

mkdir -p "$DATA_DIR"
chown -R mysql:mysql "$DATA_DIR"

if [ ! -d "$DATA_DIR/mysql" ]; then
  echo "[mysql-bootstrap] initializing data directory..."
  mariadb-install-db --datadir="$DATA_DIR" --user=mysql --auth-root-authentication-method=normal >/tmp/mysql_install.log 2>&1
fi

mkdir -p /run/mysqld
chown mysql:mysql /run/mysqld

echo "[mysql-bootstrap] starting mariadbd..."
/usr/sbin/mariadbd --datadir="$DATA_DIR" --socket="$SOCK" --user=mysql --innodb-default-row-format=DYNAMIC --innodb-strict-mode=0 &
MYSQL_PID=$!

for i in $(seq 1 30); do
  if mysqladmin --socket="$SOCK" ping >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

mysql --socket="$SOCK" -u root <<'SQL'
CREATE DATABASE IF NOT EXISTS udaan_ai;
CREATE USER IF NOT EXISTS 'udaan_user'@'localhost' IDENTIFIED BY 'UdaanSecure2026!';
GRANT ALL PRIVILEGES ON udaan_ai.* TO 'udaan_user'@'localhost';
FLUSH PRIVILEGES;
SQL

TABLE_COUNT=$(mysql --socket="$SOCK" -u root -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='udaan_ai';")
if [ "$TABLE_COUNT" -eq "0" ]; then
  echo "[mysql-bootstrap] applying schema..."
  mysql --socket="$SOCK" -u root udaan_ai < /app/backend/drizzle/0000_black_violations.sql
fi

echo "[mysql-bootstrap] ready."
wait "$MYSQL_PID"
