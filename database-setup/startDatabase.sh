#!/bin/zsh

MARIADB_USER=accessUser
MARIADB_PASSWORD=accessPassword
CONTAINER_NAME=tracker-db

colima start 2> /dev/null

echo "Starting Database..."

docker start $CONTAINER_NAME 1> /dev/null 2> /dev/null

# Warten, bis DB bereit ist
until docker exec $CONTAINER_NAME mariadb -u$MARIADB_USER -p$MARIADB_PASSWORD -e "SELECT 1;" tracker_db &> /dev/null; do
    echo "Waiting for database..."
    sleep 2
done

# SQL importieren
docker exec -i $CONTAINER_NAME sh -c "exec mariadb -u$MARIADB_USER -p$MARIADB_PASSWORD tracker_db" < ./data.sql

echo "Database successfully started"
