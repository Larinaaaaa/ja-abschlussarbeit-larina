#!/bin/zsh

MARIADB_USER=accessUser
MARIADB_PASSWORD=accessPassword
MARIADB_ROOT_PASSWORD=rootPassword

colima start 2> /dev/null

echo "Starting Database... "

docker start template-db 1> /dev/null 2> /dev/null || docker run --detach --name template-db --env MARIADB_USER=$MARIADB_USER --env MARIADB_PASSWORD=$MARIADB_PASSWORD --env MARIADB_ROOT_PASSWORD=$MARIADB_ROOT_PASSWORD -p 3306:3306 mariadb:latest 1> /dev/null

sleep 10;

docker exec -i template-db sh -c 'exec mariadb -uroot -p"$MARIADB_ROOT_PASSWORD"' < ./data.sql

echo "Database successfully started"
