#!/bin/bash

docker-compose rm -s
docker volume rm kong-oidc_keycloak-datastore kong-oidc_kong-datastore
docker network rm kong-oidc_deepmesh-net
