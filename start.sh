#!/bin/bash

##update submodules

#clean slate
minikube delete
sleep 2

minikube start --memory 6000 --kubernetes-version v1.6.0 --cpus 4
sleep 5

./jf-run.sh;