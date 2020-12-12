import { Button } from '@material-ui/core'
import React, {useEffect} from 'react'
import './Login.css'
import firebase from 'firebase'
function Login() {
    var user = null;
    const login = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div className="login">
            <div className="login_card">
            <img src="https://osx.telegram.org/updates/site/logo.png" alt=""/>
            <Button variant="contained" onClick={login}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
