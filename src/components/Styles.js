import styled from 'styled-components';
import {
  Form,
} from 'antd';

export const Form1 = styled(Form)`
position: relative;
width: 200%;
margin-top: 0%;
.ant-row, .ant-form-item{
    position: relative;
    height: 90%;
    width: 90%;
  }
`;

export const Form2 = styled(Form)`
position: relative;
width: 100%;
margin-top: 0%;
left:0%;
.ant-form-item label {
  position: relative;
  left: -10%;
}
.ant-calendar-picker-clear, .ant-calendar-picker-icon {
  left: 163%;
}
.ant-calendar-picker-input.ant-input {
  width: 176%;
  right: 0%;
}
.ant-form, .ant-form-item{
    position: relative;
    height: 100%;
    width: 100%;
    left: 0%;
  }
`;

export const Form3 = styled(Form)`
position: relative;
width: 100%;
margin-top: 0%;
left:0%;
.ant-form-item label {
  position: relative;
  left: -10%;
}
.ant-calendar-picker-clear, .ant-calendar-picker-icon {
  left: 163%;
}
.ant-calendar-picker-input.ant-input {
  width: 176%;
  right: 0%;
}
.ant-form, .ant-form-item{
    position: relative;
    height: 100%;
    width: 100%;
    left: 0%;
  }
  .ant-form-item label {
    position: relative;
    left: 5%;
}
`;
