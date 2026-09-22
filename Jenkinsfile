pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials',
                    url: 'https://github.com/arulmurugan001/davine.git',
                    branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm ci'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running backend validation...'
                dir('backend') {
                    sh 'node --check src/server.js'
                }
            }
        }

        stage('Validation') {
            steps {
                echo 'Validating required project files...'
                sh 'test -f backend/package.json'
                sh 'test -f backend/package-lock.json'
                sh 'test -f backend/src/server.js'
                echo 'Validation completed successfully.'
            }
        }
    }
    post {
 always {
            echo 'Pipeline execution completed.'
        }
        failure {
            echo 'CI pipeline failed. Check the console output.'
        }
        success {
            echo 'CI pipeline succeeded!'
        }
    }
}
