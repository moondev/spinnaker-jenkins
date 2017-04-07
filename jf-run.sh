#!/bin/bash

docker run --rm -v $PWD/Jenkinsfile:/Jenkinsfile chadmoon/jf-run:latest /groovy.sh > jf.groovy; groovy jf.groovy; rm jf.groovy