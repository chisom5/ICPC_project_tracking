import React from "react";
import { Select } from "antd";

const SelectComponent = ({ handleChange, ...props }) => {
  return (
    <Select
      placeholder={props.placeholder}
      style={{
        width: 180,
      }}
      onChange={handleChange}
      options={props.selectOptions}
    />
  );
};
export default SelectComponent;
