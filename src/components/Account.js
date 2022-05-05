/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Descriptions, Avatar, Alert } from 'antd';
import Date from './Date';
import 'react-datepicker/dist/react-datepicker.css';
import { Form1 } from './Styles';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      confirmDirty: false,
      addedSucessfully: false, // if the user is added successfully
      showSuccess: false, // if should we show a successful feedback message after add

      showError: false, // if should we show an error feedback message after adding a

      errorCode: 400, // to save the errorCode we recieved from the api server
      responseStatus: 'nothing', // the validation status of the email
      errorMessage: '', // the error message to display to the user after server reje
      date: new Date(),
      isFetching: false,
      users: [],
      data: [],
      passHistory: [],
    };
  }

  componentDidMount() {
    const user = window.sessionStorage.getItem('email');
    fetch(`http://localhost:3000/api/v1.0/users/${user}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          this.setState({ addedSucessfully: true });
        } else {
          this.setState({
            addedSucessfully: false,
            errorCode: res.status,
          });
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ data: data.data, passHistory: data.passHistory });
        console.log(data);
      });
  //  .then(data => this.checkResponse(data));
  }


  render() {
    if (this.state.addedSucessfully) {
      return (
        <div className="User">
          <div className="userBg">
            <div className="ProfileImg">
              {this.state.data.map((pic) => (
                <Avatar size={256} src={pic.profileImageURL} icon="user" />
              ))}
            </div>
            <div className="aboutMe">
              <h1>About Me</h1>
              {this.state.data.map((info) => (
                <Descriptions.Item className="antRows" label="First Name">
                  {info.About}
                </Descriptions.Item>
              ))}
              {' '}
            </div>
          </div>
          <div className="InfoBg">
            <div className="info">
              {this.state.data.map((info) => (
                <Descriptions className="userInfo" title="User Info">
                  <Descriptions.Item className="antRows" label="First Name">
                    {info.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item className="antRows" label="Last Name">
                    {' '}
                    {info.LastName}
                  </Descriptions.Item>
                  <Descriptions.Item className="antRows" label="Username">
                    {info.Username}
                  </Descriptions.Item>
                  <Descriptions.Item className="antRows" label="Birth date">
                    {info.BirthDate}
                  </Descriptions.Item>
                  <Descriptions.Item className="antRows" label="Email">
                    {info.Email}
                  </Descriptions.Item>
                  <Descriptions.Item className="antRows" label="Country">
                    {info.CountryId}
                  </Descriptions.Item>
                  <Descriptions.Item className="antRows" label="Register Date">
                    {info.dateRegistered}
                  </Descriptions.Item>
                </Descriptions>
              ))}
              {' '}
            </div>
            <div className="passwordInfo">
              <p>Password History</p>
              <div className="oldPass">
                {' '}
                <p>Old password</p>
              </div>
              <div className="passDate">
                {' '}
                <p>Date</p>
              </div>
              {this.state.passHistory.map((pass) => (
                <Descriptions className="passInfo">
                  <Descriptions.Item className="antRows">
                    <div className="oldPassData">{pass.oldPassword}</div>
                    <div className="passDateData">{pass.dateChanged}</div>
                  </Descriptions.Item>
                </Descriptions>
              ))}
              {' '}
            </div>
          </div>

          <div>
            <form onSubmit={this._handleSubmit}>
              <input type="file" onChange={this.handleImageChange} />
              <button type="submit" onClick={this.handleSubmit}>
              Upload Image
              </button>
            </form>
          </div>
        </div>
      );
    }
    return <Alert message="You do not have permission" type="error" />;
  }
}

const account = Form1.create({ name: 'register' })(Account);

export default account;
