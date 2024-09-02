pipeline {
  agent {
    kubernetes {
      yaml """
kind: Pod
metadata:
  name: tailwind-color-contrast-agent
spec:
  containers:
  - name: ci
    image: node:20.9-alpine
    command:
    - sleep
    args:
    - 9999999
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
    stage('Check Branch and PR Conditions') {
      steps {
        script {
          def srcBranch = env.CHANGE_BRANCH // Source branch in the PR
          def targetBranch = env.CHANGE_TARGET  // Target branch in the PR

          // Check if it's a PR, and if the conditions are met
          if (env.CHANGE_ID && srcBranch != 'development' && targetBranch == 'main') {
            error("Build failed: Source branch is not 'development' and target branch is 'main'.")
          }
        }
      }
    }
    stage('Lint') {
      steps {
        container('ci') {
          sh "npm ci && npm run lint"
        }
      }
    }

    stage('Format') {
      steps {
        container('ci') {
          sh "npm ci && npm run format:check"
        }
      }
    }

    stage('Build image - Dry run') {
      steps {
        script {
          def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true)
          env.GIT_COMMIT_HASH = commitHash
        }
        container('builder') {
          sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --build-arg GIT_COMMIT_HASH='${env.GIT_COMMIT_HASH}' --no-push"
        }
      }
    }

    stage('Build and deploy image to staging') {
      when {
        branch 'development'
      }
      steps {
        container('builder') {
          sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=ghcr.io/omurice-dev/tailwind-a11y:${env.BRANCH_NAME}-${env.BUILD_ID} --destination=ghcr.io/omurice-dev/tailwind-a11y:dev-latest"
        }
      }
    }
    stage('Build and publish image to prod') {
      when {
        branch 'main'
      }
      steps {
        container('builder') {
          sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=ghcr.io/omurice-dev/tailwind-a11y:${env.BRANCH_NAME}-${env.BUILD_ID} --destination=ghcr.io/omurice-dev/tailwind-a11y:latest"
        }
      }
    }
  }
}

