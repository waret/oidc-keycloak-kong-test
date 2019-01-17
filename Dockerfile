FROM kong:0.14.1-centos

MAINTAINER Waret <waret87@163.com>

LABEL description="Centos 7 + Kong 0.14.1 + kong-oidc plugin"

RUN yum install -y git unzip && yum clean all

COPY lua-resty-openidc lua-resty-openidc

RUN cd lua-resty-openidc && luarocks make *.rockspec

COPY kong-oidc kong-oidc

RUN cd kong-oidc && luarocks make *.rockspec
