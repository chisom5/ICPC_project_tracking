import React from "react";
import { Button, Select } from "antd";
import { Box, Label } from "../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../components/Button";
import colors from "../../../../../theme/colors";
import { BoxChartStyle } from "./index";
const { Option } = Select;

const BoxLineChart = ({ children, ...props }) => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // filter the charts here.
  const handleStartSelectChange = (e) => {
    console.log(e);
  };
  const handleEndSelectChange = (e) => {
    // const { x } = JSON.parse(e);
    console.log(e);
  };
  return (
    <BoxChartStyle width={props.width} flex={props.flex} height={props.height}>
      <header id="lineChart_header">
        <p className="chart_title">{props.title}</p>{" "}
        <Box display="flex">
          <Box display="flex" alignItems="center" mr={"6px"}>
            <Label pr={"4px"}>From</Label>

            <Select
              style={{
                width: "130px",
                borderRadius: "4px",
              }}
              onChange={(e) => handleStartSelectChange(e, "from")}
              showSearch
              optionFilterProp="children"
              optionLabelProp="label"
              filterOption={(input, option) => {
                return option.value
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {props.dropdownList?.map((item) => (
                <Option key={item.x} value={item.x}>
                  {item.x}
                </Option>
              ))}
            </Select>
          </Box>

          <Box display="flex" alignItems="center" mr={'6px'}>
            <Label pr={"4px"}>To</Label>
            <Select
              style={{
                width: "130px",
                borderRadius: "4px",
              }}
              showSearch
              onChange={(e) => handleEndSelectChange(e, "to")}
              optionFilterProp="children"
              optionLabelProp="label"
              filterOption={(input, option) => {
                return option.value
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {props.dropdownList?.map((item) => (
                <Option key={item.x} value={item.x}>
                  {item.x}
                </Option>
              ))}
            </Select>
          </Box>
          <ButtonOutlined
            width={"auto"}
            p={"0px 10px"}
            height="auto"
            fontWeight={5}
            borderColor={'#009A44'}
            color={'#009A44'}
            bg={colors.modes.light.white}
            borderRadius={"4px"}
          >
            Filter
          </ButtonOutlined>
        </Box>
      </header>

      {children}
    </BoxChartStyle>
  );
};
export default BoxLineChart;
