#!/bin/bash

MANIFEST=`base64 $1`
IMAGE="$2"

docker run --rm -e MANIFEST="$MANIFEST" -e IMAGE="$IMAGE" chadmoon/envsubst:latest /entrypoint.sh | kubectl apply -f -