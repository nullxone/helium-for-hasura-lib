#!/usr/bin/env bash

set -e

hasura metadata apply
hasura migrate apply --database-name default
hasura metadata apply
