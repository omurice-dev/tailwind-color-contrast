pipeline {
  agent {
    kubernetes {
      yaml """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: builder
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - sleep
    args:
    - 9999999
    volumeMounts:
    - name: jenkins-docker-cfg
      mountPath: /kaniko/.docker
  volumes:
  - name: jenkins-docker-cfg
    projected:
      sources:
      - secret:
          name: ghcr-secret
          items:
          - key: .dockerconfigjson
            path: config.json
"""
    }
  }
  stages {
    stage('Build and Publish to build id') {
      steps {
        container('builder') {
          sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=ghcr.io/omurice-dev/tailwind-a11y:${env.BUILD_ID}"
        }
      }
    }
    stage('Tag image to latest') {
      when {
        branch 'main'
      }
      steps {
        container('builder') {
          sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=ghcr.io/omurice-dev/tailwind-a11y:latest"
        }
      }
    }
  }
}

