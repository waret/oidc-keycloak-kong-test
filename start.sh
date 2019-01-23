#!/bin/bash

#docker-compose build kong
if [[ "$1" == "-b" ]]; then
    docker build . -t kong:0.14.1-centos-oidc
fi

docker-compose up -d kong-db
sleep 5
docker-compose run --rm kong kong migrations up
sleep 1
docker-compose up -d
sleep 1
docker-compose ps
