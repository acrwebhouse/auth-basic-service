# auth-basic-service

build docker
docker build . -t acrwebdev/auth-basic-service

docker push
docker push acrwebdev/auth-basic-service

docker pull
docker pull acrwebdev/auth-basic-service:latest

run docker
docker run -p 23000:23000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=23000 --env SWAGGER_IP=35.234.42.100 --env DB_URI="" --restart=always --name=auth-basic-service -d acrwebdev/auth-basic-service
