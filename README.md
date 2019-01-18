

克隆代码库到本地：
```
git checkout https://github.com/waret/kong-oidc-test.git kong-oidc-test
cd kong-oidc-test
git submoudule update
```

构建并启动服务：
```
# 构建带插件的镜像
docker build . -t kong:0.14.1-centos-oidc
docker-compose build kong
# 启动数据库
docker-compose up -d kong-db
# 初始化数据库
docker-compose run --rm kong kong migrations up
# 启动所有服务，包括Kong、Kong Dashboard、Keycloak
docker-compose up -d
# 查看启动的容器
docker-compose ps
# 查看是否启动 oidc 插件
curl -s http://localhost:8001 | jq .plugins.available_on_server.oidc
```

Kong Dashboard: [http://localhost:8280](http://localhost:8280)
  Username: admin
  Password: admin

Keycloak Dashboard: [http://localhost:8180](http://localhost:8180)

Kong: [http://localhost:8000](http://localhost:8000)

导入Realm和User信息：

!["导入Realm"](https://raw.githubusercontent.com/waret/kong-oidc-test/master/assets/image-realm.png "导入Realm")

!["导入Users"](https://raw.githubusercontent.com/waret/kong-oidc-test/master/assets/image-user.png "导入Users")


注册插件：
```
HOST_IP=$(ipconfig getifaddr en0)
curl -s -X POST http://localhost:8001/plugins \
  -d name=oidc \
  -d config.client_id=web_app \
  -d config.client_secret=web_app \
  -d config.discovery=http://${HOST_IP:8180}/auth/realms/jhipster/.well-known/openid-configuration \
  | python -mjson.tool
```

注册服务和路由信息，访问地址为 [http://localhost:8000/](http://localhost:8000)：
```
HOST_IP=$(ipconfig getifaddr en0)
ret=$(curl -s -X POST http://localhost:8001/services \
    -d name=test-service \
    -d url=http://${HOST_IP}:8080); \
    echo $ret | python -mjson.tool; \
    svcid=$(echo $ret | jq .id | awk -F\" '{print $2}')
curl -s -X POST http://localhost:8001/routes \
    -d service.id=${svcid} \
    -d paths[]=/ \
    | python -mjson.tool
```

注册服务和路由信息，访问地址为 [http://mock-service/](http://mock-service/)：
```
ret=$(curl -s -X POST http://localhost:8001/services \
    -d name=mock-service \
    -d url=http://mockbin.org/request); \
    echo $ret | python -mjson.tool; \
    svcid=$(echo $ret | jq .id | tee | awk -F\" '{print $2}')
curl -s -X POST http://localhost:8001/routes \
    -d service.id=${svcid} \
    -d hosts=mock-service \
    -d paths[]=/ | python -mjson.tool
```

调试方法：
```
# 查看日志
docker logs -f kong-oidc_kong_1
# 修改插件后重新构建镜像并重新启动kong容器
docker-compose build kong
docker-compose up -d kong
```

清理环境：
```
docker-compose rm -s
docker volum rm kong-oidc_keycloak-datastore kong-oidc_kong-datastore
docker network rm kong-oidc_keycloak-net kong-oidc_kong-net
```
