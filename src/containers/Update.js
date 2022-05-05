/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Form,
} from 'antd';
import Edit from '../components/Edit';
import Menu from '../components/Menu';
import Popup from '../components/PasswordChange';
import Delete from '../components/deleteUser';


class Update extends React.Component {
  render() {
    return (

      <div className="Edit">
        <div className="Menu">
          <Menu />
        </div>
        <Edit />
        <Delete />
        <div className="passwordPop">
          <Popup />
        </div>
      </div>
    );
  }
}


const UpdateUser = Form.create({ name: 'EditUser' })(Update);

export default UpdateUser;
