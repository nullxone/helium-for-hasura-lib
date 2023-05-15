#!/bin/bash

set -e

function dc() {
  docker compose "$@"
}

dc down -vt 1

dc up -d database hasura app
sleep 1

dc exec app /app/bin/install-dev.sh
dc exec app yarn helium compile
dc exec app yarn hedeploy

dc up -d auth

dc up -d



