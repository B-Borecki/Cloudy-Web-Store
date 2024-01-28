pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'rm -f cws.zip'
                sh 'zip -r cws.zip src package.json package-lock.json LICENSE'
            }
        }
    }
   
    post {
        always {
            s3Upload
                consoleLogLevel: 'INFO',
                dontSetBuildResultOnFailure: false,
                dontWaitForConcurrentBuildCompletion: false,
                entries:
                    [[
                        bucket: 'elasticbeanstalk-us-east-1-867854049879',
                        excludedFile: '',
                        flatten: false,
                        gzipFiles: false,
                        keepForever: false,
                        managedArtifacts: false,
                        noUploadOnFailure: false,
                        selectedRegion: 'us-east-1',
                        showDirectlyInBrowser: false,
                        sourceFile: 'cws.zip',
                        storageClass: 'STANDARD',
                        uploadFromSlave: false,
                        useServerSideEncryption: false
                    ]],
                pluginFailureResultConstraint: 'FAILURE',
                profileName: 'elasticbeanstalk-us-east-1-867854049879',
                userMetadata: []
        }
    }
}
