#!/usr/bin/env bash

set -e

hasura metadata apply
hasura migrate apply
hasura metadata apply
