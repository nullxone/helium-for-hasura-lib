#!/bin/bash

set -e

function dc() {
  docker compose "$@"
}

dc down -vt 1

dc up -d database
sleep 1

dc up -d hasura

dc up -d app

dc exec app /app/bin/install-dev.sh
dc exec app yarn helium compile
dc exec app yarn hedeploy

dc up -d auth

dc up -d



