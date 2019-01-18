#!/bin/bash

docker-compose rm -s
docker volum rm kong-oidc_keycloak-datastore kong-oidc_kong-datastore
docker network rm kong-oidc_keycloak-net kong-oidc_kong-net
