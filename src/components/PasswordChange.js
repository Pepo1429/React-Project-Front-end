/* eslint-disable react/prop-types */

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Input, Alert } from 'antd';
import Popup from 'reactjs-popup';
import 'react-datepicker/dist/react-datepicker.css';
import { Form3 } from './Styles';

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['OldPassword'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('NewPassword')) {
      callback('Password doesn`t match');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['ConfirmPassword'], { force: true });
    }
    callback();
  };

  checkResponse = (data) => {
    if (this.state.addedSucessfully) {
      this.props.form.resetFields();
      this.setState({
        showSuccess: true,
        showError: false,
      });
    } else {
      this.setState({
        errorMessage: data.message,
        showSuccess: false,
        showError: true,
        responseStatus: 'error',
      });
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const user = window.sessionStorage.getItem('email');
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // echo the values to the browser console to make sure they are correct
        console.log('Received values of form: ', values);

        // here we should send a request to our server to post the user

        // use fetch API to post the user data

        fetch(`http://localhost:3000/api/v1.0/edit/passwordChange/${user}`, {
          method: 'PUT',
          headers: {
            // eslint-disable-next-line quote-props
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values }),
        })
          .then((res) => {
            if (res.ok) {
              this.setState({ addedSucessfully: true, data: res });
            } else {
              this.setState({
                addedSucessfully: false,
                errorCode: res.status,
              });
            }
            return res.json();
          })
          .then((data) => this.checkResponse(data));
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const tailForm3ItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className="passwordForms">
        <Popup trigger={<button id="passButton"> Change Password</button>} position="bottom center">
          <div className="popup">
            <Form3 onSubmit={this.handleSubmit}>
              <Form3.Item label="Current Password" hasFeedback>
                {getFieldDecorator('OldPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 6,
                      message: 'password shoud be at least 6 characters!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form3.Item>
              <Form3.Item label="New Password" hasFeedback>
                {getFieldDecorator('NewPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 6,
                      message: 'password shoud be at least 6 characters!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form3.Item>
              <Form3.Item label="Confirm New Password" hasFeedback>
                {getFieldDecorator('ConfirmPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 6,
                      message: 'password shoud be at least 6 characters!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form3.Item>
              <Form3.Item {...tailForm3ItemLayout}>
                <button id="buttonChoose2" type="primary" htmlType="submit">
            Change Password
                </button>
                {this.state.showSuccess ? (
                  <Alert message="Password changed successfully" type="success" />
                ) : null}

                {this.state.showError ? (
                  <Alert message={this.state.errorMessage} type="error" />
                ) : null}
              </Form3.Item>
            </Form3>
          </div>
        </Popup>
      </div>
    );
  }
}

const Password = Form3.create({ name: 'password' })(PasswordChange);

export default Password;
