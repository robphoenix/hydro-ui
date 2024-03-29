pipeline {
  agent any
  options {
    // Connection is configured by the Jenkins Gitlab plugin
    // Manage Jenkins -> Configure System -> Gitlab
    gitLabConnection('gitlab-fm')
    // Keep only the 2 latest builds.
    buildDiscarder(logRotator(numToKeepStr: '2'))
    // Prepend all console output generated by the Pipeline run with the time at which the line was emitted
    timestamps()
  }
  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
  post {
    always {
      // clean up our workspace
      deleteDir()
    }
    failure {
      updateGitlabCommitStatus name: 'Hydro UI Pipeline', state: 'failed'
    }
    success {
      updateGitlabCommitStatus name: 'Hydro UI Pipeline', state: 'success'
    }
  }
  stages {
    stage('Yarn') {
      steps {
        updateGitlabCommitStatus name: 'Hydro UI Pipeline', state: 'pending'
        sh '''
        yarn config set "strict-ssl" false
        yarn config set registry https://proget/npm/Production-npm/
        yarn
        '''
      }
    }
    stage('Checks') {
      parallel {
        stage('Format') {
          steps {
            sh 'yarn run format:ci'
          }
        }
        stage('Lint') {
          steps {
            sh 'yarn run lint'
          }
        }
      }
    }
    stage('Dev Build') {
      steps {
        sh 'yarn build'
      }
    }
    stage('Dev Deploy') {
      steps {
        sh 'scp -i ~/.ssh/id_rsa -r build middleware@mn2formlt0001d0:/usr/local/bet365/hydro-ui'
      }
    }
    stage('PoC Create Artefact'){
      when {
        buildingTag()
      }
      steps {
        sh '''
        LAST_TAG=$(git describe --abbrev=0 --tags origin/master)
        tar -zcvf hydro-ui-${LAST_TAG}.tar.gz build
        ls -al
        mv hydro-ui-${LAST_TAG}.tar.gz /dev_releases/hydro/Artefacts
        '''
      }
    }
  }
}
