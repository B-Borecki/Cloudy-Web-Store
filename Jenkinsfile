pipeline {
    agent any

    stages {
        stage('Checkout') {
                steps {
                        script {
                            git branch:"main",
                                credentialsId: "CWS-github-key",
                                url: "git@github.com:B-Borecki/Cloudy-Web-Store.git"
                        }
                }
        }

        stage('Change vars') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'vars.json', variable: 'vars')]) {
                        sh 'rm -f src/vars.json'
                        writeFile file: 'src/vars.json', text: readFile(vars)
                        def var = readJSON file: "$vars"
                        env.bucket = var.bucket
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'rm -f cws.zip'
                sh 'zip -r cws.zip src package.json package-lock.json'
            }
        }

        stage("Upload") {
            steps{
                withAWS(region:"us-east-1") {
                    s3Upload(file:"cws.zip", bucket:"$bucket", path:"")
                }
            }
        }
    }
}

