node {
    
    checkout scm

    stage "Deploy Redis"
        sh "kubectl apply -f manifests/redis.yaml"
        sh "kubectl rollout status deployment/redis"

}