import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = "479503924037-24e175iahed5h75f6iaqm0j8e3tk03s4.apps.googleusercontent.com";

function GoogleAuth() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ margin: '2em 0' }}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log('Login Success:', credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
