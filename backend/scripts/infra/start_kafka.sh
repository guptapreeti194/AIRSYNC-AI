#!/bin/bash
set -e

KAFKA_DIR="/app/.infra/kafka"
LOG_DIR="/app/.infra/kafka-logs"
mkdir -p /app/.infra

if ! command -v java >/dev/null 2>&1; then
  echo "[kafka-bootstrap] installing openjdk..."
  apt-get update -qq
  apt-get install -y -qq openjdk-17-jre-headless
fi

if [ ! -d "$KAFKA_DIR" ]; then
  echo "[kafka-bootstrap] downloading kafka..."
  mkdir -p "$KAFKA_DIR"
  curl -sL https://archive.apache.org/dist/kafka/3.9.0/kafka_2.13-3.9.0.tgz -o /tmp/kafka.tgz
  tar -xzf /tmp/kafka.tgz -C "$KAFKA_DIR" --strip-components=1
  rm -f /tmp/kafka.tgz
fi

sed -i "s|^log.dirs=.*|log.dirs=$LOG_DIR|" "$KAFKA_DIR/config/kraft/server.properties"

if [ ! -d "$LOG_DIR" ] || [ -z "$(ls -A "$LOG_DIR" 2>/dev/null)" ]; then
  echo "[kafka-bootstrap] formatting storage..."
  CLUSTER_ID=$("$KAFKA_DIR/bin/kafka-storage.sh" random-uuid)
  "$KAFKA_DIR/bin/kafka-storage.sh" format -t "$CLUSTER_ID" -c "$KAFKA_DIR/config/kraft/server.properties" --standalone
fi

echo "[kafka-bootstrap] starting kafka..."
"$KAFKA_DIR/bin/kafka-server-start.sh" "$KAFKA_DIR/config/kraft/server.properties" &
KAFKA_PID=$!

for i in $(seq 1 40); do
  if "$KAFKA_DIR/bin/kafka-broker-api-versions.sh" --bootstrap-server localhost:9092 >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

"$KAFKA_DIR/bin/kafka-topics.sh" --create --if-not-exists --topic api-data-topic --bootstrap-server localhost:9092 --partitions 2 --replication-factor 1 >/dev/null 2>&1 || true

echo "[kafka-bootstrap] ready."
wait $KAFKA_PID
