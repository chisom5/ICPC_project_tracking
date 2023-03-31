import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

export const BoxChartStyle = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  width: ${(props) => props.width};
  height: ${(props) => props.height || "auto"};
  flex: ${(props) => props.flex};
  padding: 20px 28px;
  margin-right: 1rem;

  #lineChart_header {
    display: flex;
    justify-content: space-between;
  }
  .chart_title {
    text-transform: initial;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #58595b;
  }

  .box_content_container {
    display: flex;
    flex-direction: column;

    .box_content_chart {
      height: 250px;
    }
  }

  &:last-child {
    margin-right: 0px;
  }

  @media (max-width: 1024px) {
    padding: 16px;
    width: ${(props) => (props.width ? "250px" : null)};
  }
`;

export const MyResponsiveLine = ({ data, color /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 20, bottom: 20, left: 30 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    colors={color}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    enableGridX={false}
    pointSize={5}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableArea={true}
    areaOpacity={0.15}
    useMesh={true}
    legends={[]}
  />
);

export const MyResponsivePie = ({ data, color }) => {
  return (
    <ResponsivePie
      style={{ cursor: "pointer" }}
      data={data}
      margin={{ top: 40, right: 120, bottom: 20, left: 0 }}
      pixelRatio={1}
      innerRadius={0.65}
      padAngle={0.5}
      cornerRadius={0}
      colors={color}
      borderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      // onClick={handleClick}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      enableRadialLabels={false}
      enableSlicesLabels={false}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "right",
          direction: "column",
          translateX: 95,
          itemWidth: 70,
          itemHeight: 14,
          itemsSpacing: 9,
          itemTextColor: "#000",
          symbolSize: 10,
          symbolShape: "circle",
        },
      ]}
    />
  );
};
export { default as BoxPieChart } from "./PieChart";
export { default as BoxLineChart } from "./lineChart";
