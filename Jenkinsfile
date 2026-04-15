pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/UrwaSajid/auth-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                bat 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                bat 'npm run test:unit'
            }
        }

        stage('Run Integration Tests') {
            steps {
                echo 'Running integration tests...'
                bat 'npm run test:integration'
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Generating test report...'
                bat 'npm run test:report || exit /b 0'
            }
        }
    }

    post {
        success {
            echo '✅ All stages passed! Build successful.'
        }
        failure {
            echo '❌ Build failed. Check test output above.'
        }
    }
}
