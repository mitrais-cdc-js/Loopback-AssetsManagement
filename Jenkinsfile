pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage ('Check environment') {
            steps {
                sh """
                    node --version
                    npm --version
                    git --version
                """
            }
        }
        stage('Install all dependencies') { 
            steps {
                // Go to 'src' folder and install all dependencies of backend project.
                dir ('src') {
                    sh 'pwd'
                    sh 'npm install'
                }
                // Go to 'ui' folder and install all dependencies of frontend project.
                dir ('ui') {
                    sh 'pwd'
                    sh 'npm install'
                }
            }
        }
        // Start mongodb service to be able to run the unit test.
        // Todo: remove this stage, as unit test should not be depended by mongodb service.
        // Todo: Try to mock the mongodb within the unit test. 
        stage('Start mongodb') { 
            steps {
                sh 'mongod --fork --logpath /var/log/mongod.log'
            }
        }
        stage('Run backend unit test') {
            steps {
                // Go to 'src' folder.
                dir ('src') {
                    script {
                        // Run xvfb server to simulate the browser as headless browser.
                        // Then run the unit test along with code coverage report.
                        def testOut = sh(script: """
                        Xvfb :99 -screen 0 1024x768x16 &> xvfb.log &
                        export DISPLAY=:99.0
                        ps -ea
                        npm run test
                        node_modules/.bin/istanbul cover node_modules/mocha/bin/_mocha test/**/*.test.js
                        node_modules/.bin/istanbul check-coverage --statements 10 --branches 10 --functions 10 --lines 10
                        """, returnStdout: true).trim()
                        writeFile(file: 'coverage.txt', text: testOut)
                        // Publish the code coverage report as html so it is accessible through Jenkins build result menu.
                        publishHTML (target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: false,
                            keepAll: true,
                            reportDir: "coverage/lcov-report",
                            reportFiles: "index.html",
                            reportName: "Code coverage report"
                        ])
                    }
                } 
                
            }
        }
        // Todo: remove this stage, as unit test should not be depended by mongodb service.
        // Todo: Try to mock the mongodb within the unit test. 
        stage('Stop mongodb') { 
            steps {
                sh 'mongod --shutdown'
            }
        }
        stage('Prepare the frontend and backend artifacts before deployment') { 
            steps {
                // Go to 'ui' folder.
                dir ('ui') {
                    // Remove 'dist' folder along with it's contents.
                    sh 'rm -rf dist'

                    // Build the ui project and generate 'dist' folder.
                    sh 'node_modules/.bin/ng build --env=prod'
                }

                // Go to root folder of current project.
                // Remove 'LoopbackDeploy/frontend' folder along with it's contents.
                sh 'rm -rf LoopbackDeploy/frontend'

                // Recreate the 'LoopbackDeploy/frontend' folder.
                sh 'mkdir -p LoopbackDeploy/frontend'

                // Remove 'LoopbackDeploy/backend' folder along with it's contents.
                sh 'rm -rf LoopbackDeploy/backend'

                // Recreate the 'LoopbackDeploy/backend' folder.
                sh 'mkdir -p LoopbackDeploy/backend'
                
                // Remove 'LoopbackDeploy/script' folder along with it's contents.
                sh 'rm -rf LoopbackDeploy/script'

                // Recreate the 'LoopbackDeploy/script' folder.
                sh 'mkdir -p LoopbackDeploy/script'

                // Copy 'ui/dist' contents to 'LoopbackDeploy/frontend' folder.
                sh 'cp -R ui/dist/. LoopbackDeploy/frontend'

                // Copy 'src' contents to 'LoopbackDeploy/backend' folder.
                sh 'cp -R src/. LoopbackDeploy/backend'

                // Copy 'script' contents to 'LoopbackDeploy/script' folder.
                sh 'cp -R script/. LoopbackDeploy/script'

                // Copy appspec.yml file to 'LoopbackDeploy' folder.
                sh 'cp appspec.yml LoopbackDeploy'

                // Remove 'node_modules' folder within 'LoopbackDeploy/backend' folder.
                sh 'rm -rf LoopbackDeploy/backend/node_modules'

                // Remove 'middleware.development.json' within 'LoopbackDeploy/backend/server/' folder.
                sh 'rm -f LoopbackDeploy/backend/server/middleware.development.json'
            }
        }
    }
}
