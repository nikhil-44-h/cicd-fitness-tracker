pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        JAVA_VERSION = '17'
        DOCKERHUB_USERNAME = 'karthikeyabollineni04'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub' // Jenkins credentials ID
        FRONTEND_IMAGE = 'fitness-tracker-frontend'
        BACKEND_IMAGE = 'fitness-tracker-backend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                echo "Using Node.js version ${NODE_VERSION}"
                bat "node -v || echo 'Node not installed on agent'"
                bat "npm -v || echo 'npm not installed on agent'"
            }
        }

        stage('Build Frontend') {
            steps {
                dir('fitness-tracker-frontend') {
                    echo "Installing frontend dependencies..."
                    bat 'npm install'
                    echo "Building React frontend..."
                    bat 'npx vite build --base=/fitness-tracker-frontend/'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('fitness-tracker-backend') {
                    echo "Building Spring Boot backend..."
                    bat "mvn clean package -DskipTests"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('fitness-tracker-frontend') {
                    echo "Building Docker image for frontend..."
                    bat "docker build -t %DOCKERHUB_USERNAME%/%FRONTEND_IMAGE%:latest ."
                }
                dir('fitness-tracker-backend') {
                    echo "Building Docker image for backend..."
                    bat "docker build -t %DOCKERHUB_USERNAME%/%BACKEND_IMAGE%:latest ."
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS_ID}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    echo "Logging into Docker Hub..."
                    bat 'echo %PASS% | docker login -u %USER% --password-stdin'
                    echo "Pushing frontend image..."
                    bat "docker push %DOCKERHUB_USERNAME%/%FRONTEND_IMAGE%:latest"
                    echo "Pushing backend image..."
                    bat "docker push %DOCKERHUB_USERNAME%/%BACKEND_IMAGE%:latest"
                }
            }
        }
    }

    post {
        success { echo '✅ Build & Docker push completed successfully!' }
        failure { echo '❌ Build failed. Check logs for errors.' }
    }
}
