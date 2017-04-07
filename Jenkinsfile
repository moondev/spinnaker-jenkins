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

    stage "Deploy clouddriver"
        sh "./apply.sh manifests/clouddriver.yaml quay.io/spinnaker/clouddriver:v1.490.0"
        sh "kubectl rollout status deployment/clouddriver"

    stage "Deploy orca"
        sh "./apply.sh manifests/orca.yaml quay.io/spinnaker/orca:v1.304.0"
        sh "kubectl rollout status deployment/orca"

    // stage "Deploy echo"
    //     sh "./apply.sh manifests/echo.yaml quay.io/spinnaker/echo:v1.132.0"
    //     sh "kubectl rollout status deployment/echo"

    stage "Deploy gate"
        sh "./apply.sh manifests/gate.yaml quay.io/spinnaker/gate:v3.1.0"
        sh "kubectl rollout status deployment/gate"

    // stage "Deploy igor"
    //     sh "./apply.sh manifests/igor.yaml quay.io/spinnaker/igor:v1.64.0"
    //     sh "kubectl rollout status deployment/igor"

    stage "Deploy deck"
        sh "./apply.sh manifests/deck.yaml quay.io/spinnaker/deck:v2.1028.0"
        sh "kubectl rollout status deployment/deck"

    stage "Launch deck"
        sh "minikube service deck"
}