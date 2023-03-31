import React from "react";
import { BoxChartStyle } from "./index";

const BoxPieChart = ({ children, ...props }) => {
  return (
    <BoxChartStyle width={props.width} flex={props.flex} height={props.height}>
      <p className="chart_title">{props.title}</p>

      {children}
    </BoxChartStyle>
  );
};
export default BoxPieChart;
