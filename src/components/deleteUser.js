/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router-dom';
import { Descriptions } from 'antd';
import Popup from 'reactjs-popup';
import { Form3, Form2 } from './Styles';


class userDeleting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      deletedSucessfully: false, // if the user is added successfully
      showSuccess: false, // if should we show a successful feedback message after add
      showError: false, // if should we show an error feedback message after adding a
      errorCode: 400, // to save the errorCode we recieved from the api server
      responseStatus: 'nothing', // the validation status of the email
      errorMessage: '', // the error message to display to the user after server reje
      isFetching: false,
      email: '',
    };
  }


  componentDidMount() {
    const isDel = window.sessionStorage.getItem('email');
    if (isDel === 'null') {
      const del = window.sessionStorage.getItem('email');
      this.setState({ email: del });
    }
  }

 handleSubmit = (e) => {
   e.preventDefault();
   const user = window.sessionStorage.getItem('email');
   this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       // echo the values to the browser console to make sure they are correct
       console.log('Received values of form: ', values);

       // here we should send a request to our server to post the user

       // use fetch API to post the user data

       fetch(`http://localhost:3000/api/v1.0/users/${user}`, {

         method: 'DELETE',
       })
         .then((res) => {
           if (res.ok) {
             this.setState({ deletedSucessfully: true });
             window.sessionStorage.setItem('email', 'null');
           } else {
             this.setState({
               deletedSucessfully: false,
               errorCode: res.status,
             });
           }
           return res.json();
         })
         .then((data) => this.checkResponse(data));
       this.props.history.push('/register');
     }
   });
 };


  checkResponse = (data) => {
    if (this.state.deletedSucessfully) {
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

  render() {
    if (this.state.email !== 'null') {
      const contentStyle = {
        height: '25%',
        width: '30%',
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
        <div className="deleteUser">
          <Popup modal contentStyle={contentStyle} trigger={<button id="deleteButton"><a> Delete account</a></button>} position=" center">
            <Descriptions className="alert">
              <Descriptions.Item>
                <a>Are you sure you want to delete your Account ?</a>
              </Descriptions.Item>
            </Descriptions>
            <Form2 onSubmit={this.handleSubmit}>
              <Form2.Item {...tailForm2ItemLayout}>
                <button id="buttonDelForm" type="primary" htmlType="submit">
            Delete
                </button>
              </Form2.Item>
            </Form2>
          </Popup>
        </div>
      );
    }

    return null;
  }
}

const Delete = Form3.create({ name: 'deleteuser' })(userDeleting);

export default withRouter(Delete);
