#!/usr/bin/env bash

docker-machine env
eval $(docker-machine env)
docker-compose down
docker-compose up -d