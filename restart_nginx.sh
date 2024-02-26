#/bin/bash

docker stop hype-frontend-nginx-1
docker rm hype-frontend-nginx-1
docker rmi hype_frontend-nginx
docker compose up -d