
import {
  Form,
  Select,
  Descriptions,
  Button,
} from "antd"
import { Layout } from 'antd';
import styled from 'styled-components';


export const SiteContainer = styled(Layout)`
  flex-direction: column;
  align-items: center;

  .ant-descriptions .ant-descriptions-row > th {
    padding-bottom: 40px;
  }

  .ant-descriptions .ant-descriptions-row > td {
    padding-bottom: 40px;
  }
`;

export const FormWrapper = styled(Form)`
  .ant-form-vertical .ant-form-item-label {
    padding: 40px;
    margin: 40px;
    white-space: initial;
    text-align: start;
  }
`;

export const SiteDescriptions = styled(Descriptions)`
  padding-top: 40px;
  margin-top: 40px;
  margin-bottom: 40px;

  border:  1 solid grey;
  border-radius: 5;
  background-color: white;

  .ant-descriptions-title {
    font-weight: 600;
  }

  .ant-form-item {
    width: 100%;
    padding-right: 40px;
  }
`;

export const SiteImage = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectCode = styled(Select)`
  height: 30px;
`;

export const FooterButton = styled(Button)`
  margin-left: 40px;
`;





export const BottomPadding = styled.div`
  height: 8px;
`;
