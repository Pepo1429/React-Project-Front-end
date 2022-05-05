/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unused-state */
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

class DateSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      setDate: null,
    };
  }

  handleChange = (startDate) => {
    this.setState({ startDate });
  };


  changeHandler = (e) => {
    this.handleChange(e);
    this.changeDate(e);
  };

  changeDate(defaultValue) {
    // eslint-disable-next-line react/prop-types
    this.props.onChange(
      `${defaultValue._d.getFullYear()}/${defaultValue._d.getMonth()
        + 1}/${defaultValue._d.getDate()}`,
    );
  }

  render() {
    return (
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={this.state.startDate}
        setDate={this.state.setData}
        defaultValue={moment('2019/01/01', dateFormat)}
        format={dateFormat}
        onChange={this.changeHandler}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    );
  }
}

export default DateSelect;
