#!/bin/bash

docker-compose build kong
docker-compose up -d kong-db
sleep 1
docker-compose run --rm kong kong migrations up
sleep 1
docker-compose up
