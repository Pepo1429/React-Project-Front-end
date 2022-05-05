/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, withRouter } from 'react-router-dom';

import { Menu, Icon } from 'antd';

class myMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
    };
  }

  handleClick = (e) => {
    console.log('click ', e);
    if (e.key === 'logout') {
      this.props.history.push('/register');
      sessionStorage.removeItem('email');
    } else { this.props.history.push(e.key); }
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item as={Link} to="/account" key="/account">
          <Icon type="profile" />
          My Account
        </Menu.Item>
        <Menu.Item as={Link} to="/editUser" key="/editUser">
          <Icon type="setting" />
          Edit Account
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(myMenu);
