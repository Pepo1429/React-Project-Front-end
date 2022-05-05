import React from 'react';
import '../App.css';
import FacebookLogin from 'react-facebook-login';
import {
  Form,
} from 'antd';
import Signup from '../components/Signup';

class Registration extends React.Component {
  // sendFacebookResponse(response) {
  //   console.log(response.accessToken);
  //   const token = response.accessToken;
  //   const url = `http://localhost:3000/auth/facebook/token?access_token=${token}`;

  //   fetch(url, {
  //     mode: 'no-cors',
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((success) => {})
  //     .catch((error) => console.log(error));
  //   console.log(response);
  // }

  render() {
    return (

      <div className="App">
        <div className="App-left" />
        <div className="App-top">
          <div className="inputForms">
            <Signup />
            <FacebookLogin
              appId="528678561303191"
              autoLoad
              fields="name,email,picture"
              callback={this.sendFacebookResponse}
            />
          </div>
        </div>
      </div>
    );
  }
}


const Register = Form.create({ name: 'register' })(Registration);

export default Register;
