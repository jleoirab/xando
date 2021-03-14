#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

docker-compose -f ${DIR}/../infra/docker/docker-compose.yml up -d

echo "Started all dependencies"

docker ps