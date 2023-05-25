#!/usr/bin/env bash

set -e

hasura metadata apply
mkdir -p migrations/default
hasura migrate apply --database-name default
hasura metadata reload
