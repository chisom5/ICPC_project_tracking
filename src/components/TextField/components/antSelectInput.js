import React from "react";
import { Box } from "../../Primitives";
import { Select } from "antd";
import styled from "styled-components";
import colors from '../../../theme/colors';

const { Option } = Select;

const SelectStyle = styled(Box)`
.ant-select{
  width: 100%;
}
  .ant-select-selector {
    height: 32px;
    background-color: ${colors.modes.light.inputBgColor} !important;
    border: 1px solid #d3d5d7 !important;
  }
`;
const SelectInput = ({ selectOptions, style, ...props }) => {
  return (
    <SelectStyle display="flex" alignItems="center" position="relative" style={style}>
      <Select {...props}>
        {selectOptions &&
          selectOptions.map((v, i) => (
            <Option key={i} value={v.value}>
              {v.name}
            </Option>
          ))}
      </Select>
    </SelectStyle>
  );
};

export default SelectInput;
