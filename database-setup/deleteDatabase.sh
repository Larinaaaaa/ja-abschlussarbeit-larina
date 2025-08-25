#!/bin/zsh

docker container stop template-db 1> /dev/null 2> /dev/null

docker container rm template-db 1> /dev/null 2> /dev/null

echo "Database successfully stopped and deleted"