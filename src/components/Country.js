/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Form } from 'antd';

class CountrySelect extends React.Component {
  constructor(props) {
    super(props);

    this.options = countryList().getData();
    this.state = {
      options: this.options,
      value: null,
      country: '',
      label: null,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  changeCountry = (label) => {
    this.setState({ label });
  };

  changeHandler = (e) => {
    this.changeCountry();
    this.changeValue(e);
  };

  changeValue(country) {
    const nameCountry = Object.values(country.label);
    const mergeCountry = nameCountry.join('');
    this.props.onChange(mergeCountry.toString());
  }

  render() {
    return (
      <Select
        options={this.state.options}
        label={this.state.label}
        onChange={this.changeHandler}
      />
    );
  }
}
const Country = Form.create({ name: 'country' })(CountrySelect);

export default Country;
