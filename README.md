# auth-basic-service

build docker
docker build . -t acrwebdev/auth-basic-service:0.0.1

docker push
docker push acrwebdev/auth-basic-service:0.0.1

docker pull
docker pull acrwebdev/auth-basic-service:0.0.1

run docker
docker run -p 23000:23000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=23000 --env SWAGGER_IP=34.80.78.75 --env DB_URI="" --restart=always --name=auth-basic-service -d acrwebdev/auth-basic-service:0.0.1
