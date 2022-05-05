/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Input, Alert, Descriptions, Avatar,
} from 'antd';
import { withRouter } from 'react-router-dom';
import Country from './Country';
import Date from './Date';
import 'react-datepicker/dist/react-datepicker.css';
import { Form2 } from './Styles';

const { TextArea } = Input;

class EditForm extends React.Component {
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
      data: [],
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlternative = this.handleAlternative.bind(this);
  }

  componentDidMount() {
    const user = window.sessionStorage.getItem('email');
    fetch(`http://localhost:3000/api/v1.0/edit/${user}`, {
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
        this.setState({ data });
        console.log(data); // Prints result from `response.json()` in getRequest
      });
  //  .then(data => this.checkResponse(data));
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkName = (rule, value, callback) => {
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

  handleAlternative() {
    const user = window.sessionStorage.getItem('email');
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // echo the values to the browser console to make sure they are correct
        console.log('Received values of form: ', values);

        // here we should send a request to our server to post the user

        // use fetch API to post the user data

        fetch(`http://localhost:3000/api/v1.0/users/${user}`, {

          method: 'PUT',
          headers: {
            Accept: 'application/json',
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
      window.location.reload();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = window.sessionStorage.getItem('email');
    const toBody = this.Jbody();
    fetch(`http://localhost:3000/api/v1.0/upload/${user}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toBody }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    console.log(this.state.imagePreviewUrl);
    window.location.reload();
  }

  Jbody() {
    const getJ = this.state.imagePreviewUrl;
    return getJ;
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
      console.log(this.state.file);
      console.log(this.state.imagePreviewUrl);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }


  render() {
    if (this.state.addedSucessfully) {
      const { imagePreviewUrl } = this.state;
      // eslint-disable-next-line no-unused-vars
      let $imagePreview = null;
      if (imagePreviewUrl) {
        // eslint-disable-next-line jsx-a11y/alt-text
        $imagePreview = <img src={imagePreviewUrl} />;
      }

      const { getFieldDecorator } = this.props.form;
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
      const tailForm2ItemLayout = {
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
        <div className="ContentEdit">
          <div className="EditFields">
            {this.state.data.map((info) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Form2 {...formItemLayout} onSubmit={this.handleAlternative}>
                <Form2.Item label="FirstName" hasFeedback>
                  {getFieldDecorator('firstName', {
                    rules: [
                      {
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
                </Form2.Item>
                <Form2.Item label="LastName" hasFeedback>
                  {getFieldDecorator('lastName', {
                    rules: [
                      {
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
                </Form2.Item>
                <Form2.Item label="Username" hasFeedback>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        message: 'Please enter username',
                      },
                      {
                        message: 'Please enter valid name',
                      },
                      {
                        validator: this.checkName,
                      },
                    ],
                  })(<Input defaultValue="pepo" />)}
                </Form2.Item>

                <Form2.Item label="Country">
                  {getFieldDecorator('countryId', {
                    rules: [
                      {
                        message: 'Please select country',
                      },
                    ],
                  })(<Country value={info.CountryId} />)}
                </Form2.Item>
                <Form2.Item label="Date of Birth">
                  {getFieldDecorator('BirthDate', {
                    rules: [
                      {
                        message: 'Please select DOB',
                      },
                    ],
                  })(<Date />)}
                </Form2.Item>
                <Form2.Item label="About me">
                  {getFieldDecorator('about', {
                    rules: [
                      {
                        message: 'Please write something about you',
                      },
                    ],
                  })(<TextArea />)}
                </Form2.Item>

                <Form2.Item {...tailForm2ItemLayout}>
                  <button id="buttonChoose1" type="primary" htmlType="submit">
            Update
                  </button>
                </Form2.Item>
                {this.state.showSuccess ? (
                  <Alert message="account created successfully" type="success" />
                ) : null}

                {this.state.showError ? (
                  <Alert message={this.state.errorMessage} type="error" />
                ) : null}
              </Form2>
            ))}
            {' '}
          </div>
          <div className="dataContainer">
            <div className="imgData">
              <div className="ImgEdit">
                {this.state.data.map((pic) => (
                  <Avatar size={128} src={pic.profileImageURL} icon="user" />

                ))}
              </div>
              <div className="imgButton">
                <form onSubmit={this._handleSubmit}>
                  <input id="buttonChoose" type="file" onChange={this.handleImageChange} />
                  <button id="buttonChoose" name="upload" type="submit" onClick={this.handleSubmit}>
              Upload Image
                  </button>
                </form>
              </div>
            </div>
            <div className="infoContent">
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
          </div>
          <div className="Footer">
            <p>&copy; 2019 Raev</p>
          </div>
        </div>
      );
    }
    return <Alert message="You do not have permission" type="error" />;
  }
}

const Edit = Form2.create({ name: 'editUser' })(EditForm);

export default withRouter(Edit);
