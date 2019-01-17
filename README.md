

```
# 构建带插件的镜像
docker build . -t kong:0.14.1-centos-oidc
# 启动数据库
docker-compose up -d kong-db
# 初始化数据库
docker-compose run --rm kong kong migrations up
# 启动Kong服务
docker-compose up -d kong
# 查看启动的容器
docker-compose ps
# 查看是否启动 oidc 插件
curl -s http://localhost:8001 | jq .plugins.available_on_server.oidc
# 注册服务
a=$(curl -s -X POST http://localhost:8001/services \
    -d name=mock-service \
    -d url=http://mockbin.org/request); \
    echo $a | python -mjson.tool; \
    svcid=$(echo $a | jq .id | tee | awk -F\" '{print $2}')
# 注册路由
curl -s -X POST http://localhost:8001/routes \
    -d service.id=${svcid} \
    -d paths[]=/ | python -mjson.tool
# 注册插件
curl -s -X POST http://localhost:8001/plugins \
  -d name=oidc \
  -d config.client_id=web_app \
  -d config.client_secret=web_app \
  -d config.discovery=http://keycloak.10.20.1.72.nip.io/auth/realms/jhipster/.well-known/openid-configuration \
  | python -mjson.tool
# 查看日志
docker logs -f kong-oidc_kong_1
```

在浏览器里打开 http://localhost:8000/ 页面，测试结果。


修改 Dockerfile 后，依次执行如下命令，方便快速测试
```
docker-compose build kong
docker-compose up -d kong
```
