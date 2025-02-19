pipeline {
    agent any

    environment {
        NODEJS_HOME = "${tool 'node21'}"
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"

        REPO_URL = "https://github.com/uniteam31/unishare-frontend.git"
        API_URL = "http://176.114.90.241/api"
        NOTES_URL = "http://176.114.90.241:3001/remoteEntry.js"
        FRIENDS_URL = "http://176.114.90.241:3002/remoteEntry.js"
        DEV_SERVER_IP = "176.114.90.241"

        BRANCH_NAME = "${env.BRANCH_NAME ?: 'dev'}"
        DOCKER_IMAGE_NAME = "def1s/unishare-frontend"
        DOCKER_REGISTRY = "https://registry.hub.docker.com"
        DOCKER_CREDENTIALS_ID = "docker-def1s"
        DEPLOY_SCRIPT_PATH = "/root/unishare-orchestration/deploy.sh"
        NPMRC_CONFIG_FILE_ID = "uniteam-npmrc"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: BRANCH_NAME, url: REPO_URL
            }
        }

        stage('Deploy to Dev Server') {
            steps {
                sshagent(['dev_ssh']) {
                     sh "ssh root@${DEV_SERVER_IP} \"${DEPLOY_SCRIPT_PATH}\""
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline выполнен успешно.'
        }
        failure {
            echo 'Pipeline завершился с ошибкой.'
        }
        always {
            script {
                if (app) {
                    echo "Cleaning up Docker image ${DOCKER_IMAGE_NAME}"
                    sh "docker rmi ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} || true"
                    sh "docker rmi ${DOCKER_IMAGE_NAME}:latest || true"
                }
            }

            cleanWs()
        }
    }
}