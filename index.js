pipeline{

	agent {label 'slave1'}

	environment {
		DOCKERHUB_CREDENTIALS=credentials('docker-push')
	}

	stages {
	    
	    stage('gitclone') {

			steps {
				git 'https://github.com/vendantamizh/dockerimage-hub.git'
			}
		}

		stage('Build') {

			steps {
				sh 'docker build -t vendantamizh/nodeapp_test:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push vendantamizh/nodeapp_test:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}
