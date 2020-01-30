global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const config = require('./aws-config.json');

function getIdToken(){
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    ClientId: config.ClientId,
    UserPoolId: config.UserPoolId
  });

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username : config.Username,
    Password : config.Password,
  });

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username : config.Username,
    Pool : userPool
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: result => console.log('Bearer ' + result.idToken.jwtToken),
    onFailure: err => console.error(err),
  });
}

getIdToken();
