node{
  stage('SCM') {
    checkout poll: false, 
    scm: [$class: 'GitSCM', 
      branches: [[name: 'master']], 
      doGenerateSubmoduleConfigurations: false, 
      extensions: [], 
      submoduleCfg: [], 
      userRemoteConfigs: [[url: 'https://github.com/saibabanadh/sonar-example.git']
    ]
  }
  stage('SonarQube Analysis') {
        def scannerHome = tool 'SonarScanner 4.0';
        sh "${scannerHome}/bin/sonar-scanner \
         -Dsonar.host.url=http://sonarqube:9000 \
         -Dsonar.projectName=sonar-example \
         -Dsonar.projectVersion=1.0 \
         -Dsonar.projectKey=sonar-example:app \
         -Dsonar.sources=. \
         -Dsonar.projectBaseDir=/var/jenkins_home/workspace/sonar-example"
  }
}
