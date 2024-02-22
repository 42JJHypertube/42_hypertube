#/bin/bash

docker stop hype-frontend-server-1
docker rm hype-frontend-server-1
docker rmi hype_frontend-server
docker compose up