#!/usr/bin/env bash

set -e

hasura metdata apply
hasura migrate apply
hasura metdata apply