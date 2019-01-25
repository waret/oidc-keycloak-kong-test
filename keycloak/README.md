docker build  . -t jboss/keycloak-theme:4.8.3.Final

docker run --rm -it  --entrypoint "" jboss/keycloak-theme:4.8.3.Final bash
