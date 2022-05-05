/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form, Input, Alert, Checkbox, Button,
} from 'antd';
import Country from './Country';
import Date from './Date';
import 'react-datepicker/dist/react-datepicker.css';

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      addedSucessfully: false, // if the user is added successfully
      showSuccess: false, // if should we show a successful feedback message after add
      showError: false, // if should we show an error feedback message after adding a
      errorCode: 400, // to save the errorCode we recieved from the api server
      responseStatus: 'nothing', // the validation status of the email
      errorMessage: '', // the error message to display to the user after server reje
      date: new Date(),
      email: '',
    };
    this.routeChange = this.routeChange.bind(this);
  }


  onSubmit = () => {
    this.props.history.push('/account');
  };

  setCountry(country) {
    this.setState({ country });
    console.log(country);
  }

  setDate(date) {
    this.setState({ date });
    console.log(date);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // echo the values to the browser console to make sure they are correct
        console.log('Received values of form: ', values);

        // here we should send a request to our server to post the user

        // use fetch API to post the user data

        fetch('http://localhost:3000/api/v1.0/users', {

          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values }),
        })
          .then((res) => {
            if (res.ok) {
              this.setState({ addedSucessfully: true });
              this.onSubmit();
            } else {
              this.setState({
                addedSucessfully: false,
                errorCode: res.status,
              });
            }
            return res.json();
          })
          .then((data) => this.checkResponse(data));
        window.sessionStorage.setItem('email', values.email);
      }
    });
  };


  handleEmail = () => {
    this.setState({ responseStatus: 'nothing' });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password doesn`t match');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  checkName = (rule, value, callback) => {
    // eslint-disable-next-line radix
    const isNumber = parseInt(value);
    if (Number.isInteger(isNumber)) {
      callback('The name should not start with numbers');
    } else {
      callback();
    }
  };

  checkResponse = (data) => {
    if (this.state.addedSucessfully) {
      this.props.form.resetFields();
      this.setState({
        showSuccess: true,
        showError: false,
      });
    } else {
      // handle errors
      this.setState({
        errorMessage: data.message,
        showSuccess: false,
        showError: true,
        responseStatus: 'error',
      });
    }
  };

  routeChange() {
    const path = '/account';
    this.props.history.push(path);
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    // this code will handle form responsivness on small devices
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
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

    // prefix the email input with some decoration
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="FirstName" hasFeedback>
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please enter your first name',
              },
              {
                message: 'Please enter valid name',
              },
              {
                validator: this.checkName,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="LastName" hasFeedback>
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter your last name',
              },
              {
                message: 'Please enter valid name',
              },
              {
                validator: this.checkName,
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Username" hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please enter username',
              },
              {
                message: 'Please enter valid name',
              },
              {
                validator: this.checkName,
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Country">
          {getFieldDecorator('country', {
            rules: [
              {
                required: true,
                message: 'Please select country',
              },
            ],
          })(<Country />)}
        </Form.Item>

        <Form.Item label="Date of Birth">
          {getFieldDecorator('calendar', {
            rules: [
              {
                required: true,
                message: 'Please select DOB',
              },
            ],
          })(<Date />)}
        </Form.Item>

        <Form.Item
          label="Email"
          hasFeedback
          validateStatus={this.state.responseStatus}
          help={this.state.errorMessage}
        >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input onChange={this.handleEmail} />)}
        </Form.Item>

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
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
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('passwordConfirmation', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the
              {' '}
              <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>


        </Form.Item>
        {this.state.showSuccess ? (
          <Alert message="account created successfully" type="success" />
        ) : null}

        {this.state.showError ? (
          <Alert message={this.state.errorMessage} type="error" />
        ) : null}
      </Form>
    );
  }
}
const Signup = Form.create({ name: 'register' })(RegistrationForm);

export default withRouter(Signup);
