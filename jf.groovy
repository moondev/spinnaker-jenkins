#!/usr/bin/env groovy

import static Constants.*

class Constants {
    static final scm = "scm"
}

def node(Closure c){
    c.call()
}

def sh(cmd) {
    ProcessBuilder builder = new ProcessBuilder( cmd.split(' ') )
    builder.redirectErrorStream(true)
    Process process = builder.start()
    
    InputStream stdout = process.getInputStream ()
    BufferedReader reader = new BufferedReader (new InputStreamReader(stdout))
    
    while ((line = reader.readLine ()) != null) {
        System.out.println (line)
    }
}

def checkout (scm) {

}

def scm () {
    return "scm";
}

def stage (stageName){
    println "RUNNING STAGE "
}

node {
    
    checkout scm

    stage "Create config-map"
        sh "kubectl delete configmap spinnaker-config"
        sh "kubectl create configmap spinnaker-config --from-file=config"

    stage "Deploy Redis"
        sh "kubectl apply -f manifests/redis.yaml"
        sh "kubectl rollout status deployment/redis"

    stage "Deploy front50"
        sh "./apply.sh manifests/front50.yaml quay.io/spinnaker/front50:v1.69.0"
        sh "kubectl rollout status deployment/front50"
        sh "sleep 10"

    stage "Deploy clouddriver"
        sh "./apply.sh manifests/clouddriver.yaml quay.io/spinnaker/clouddriver:v1.490.0"
        sh "kubectl rollout status deployment/clouddriver"
        sh "sleep 10"

    stage "Deploy orca"
        sh "./apply.sh manifests/orca.yaml quay.io/spinnaker/orca:v1.304.0"
        sh "kubectl rollout status deployment/orca"
        sh "sleep 10"

    stage "Deploy echo"
        sh "./apply.sh manifests/echo.yaml quay.io/spinnaker/echo:v1.132.0"
        sh "kubectl rollout status deployment/echo"
        sh "sleep 10"

    stage "Deploy gate"
        sh "./apply.sh manifests/gate.yaml quay.io/spinnaker/gate:v3.1.0"
        sh "kubectl rollout status deployment/gate"
        sh "sleep 10"

    stage "Deploy igor"
        sh "./apply.sh manifests/igor.yaml quay.io/spinnaker/igor:v1.64.0"
        sh "kubectl rollout status deployment/igor"
        sh "sleep 10"

    stage "Deploy deck"
        sh "./apply.sh manifests/deck.yaml quay.io/spinnaker/deck:v2.1028.0"
        sh "kubectl rollout status deployment/deck"
        sh "sleep 10"

    stage "Launch deck"
        sh "minikube service deck"
}
