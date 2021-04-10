const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: "us-east-1_dTtHzlieJ",
   ClientId: "323frdr9fvh4pm96p2un7og3al"
};
const pool_region = "us-east-1";
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


function RegisterUser(username,password,email,firstname,lastname,callback){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "given_name", Value: firstname }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "family_name", Value: lastname }));

    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        callback(cognitoUser);
    });
}

function ConfirmEmail(username,code,callback){
    var userData = {
        Username: username,
        Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
        callback("sucess");
    });

}

function Login(email,password,callback){
    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    var userData = {
        Username: email,
        Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            // var accessToken = result.getAccessToken().getJwtToken();
            console.log(result)
            callback('success');
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });

}

export { RegisterUser,ConfirmEmail,Login }