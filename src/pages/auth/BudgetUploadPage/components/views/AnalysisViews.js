import React, { useState, useEffect } from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../components/Button";
import { Table, Row, Col } from "antd";
import OverviewCard from "../card";
import colors from "../../../../../theme/colors";
import { Pie, measureTextWidth } from "@ant-design/plots";
import "./style.css";
import { useSelector } from "react-redux";
import { accountingFormat } from "../../../../../utils";

const AnalysisViews = ({ handleBack, handlePagination }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { budgetStatitics, anomaliesData } = useSelector(
    (state) => state.budget
  );

  const style = {
    background: "#fff",
    padding: "8px",
  };

  const extractAmountFilter = () => {
    let res = [];

    anomaliesData?.map((item) => {
      let a = res.findIndex((i) => i.value === item.Amount);

      if (a === -1) {
        // remove duplicate.
        res.push({
          text: accountingFormat(item.Amount),
          value: item.Amount,
        });
      }
    });

    return res;
  };

  const columns = [
    {
      title: "Project Code",
      dataIndex: "ProjectCode",
    },

    {
      title: "Description",
      dataIndex: "Description",
      render: (Description, data) =>
        data.IgnoreAnomaly == 1 ? (
          <span>
            {Description} <span style={{ color: "red" }}>(Ignored)</span>
          </span>
        ) : (
          <span>
            {Description}
            <span></span>
          </span>
        ),
    },

    {
      title: "Budget Amount",
      dataIndex: "Amount",
      render: (Amount) => <span>{Amount.toLocaleString()}</span>,
      sorter: (a, b) => a.Amount - b.Amount,
      filters: extractAmountFilter(),
      onFilter: (value, record) => {
        return record.Amount === value;
      },
    },
  ];

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    );
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`;
  }

  const data = [
    {
      type: "Soft Projects",
      value: budgetStatitics?.TotalSoftProjectCount,
    },
    {
      type: "Hard Projects",
      value: budgetStatitics?.TotalHardProjectCount,
    },
  ];

  const config = {
    color: ["#009A44", "#BC204B"],
    appendPadding: 10,
    height: 200,
    responsive: true,
    maintainAspectRatio: false,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v}`,
      },
    },

    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "rgb(255, 99, 132)",
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
      },
      autoRotate: false,
      content: "{value}",
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : "";
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "32px",
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? ` ${datum.value}`
            : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },

    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
  };

  return (
    <OtherContentContainer padding={"17px 16px 0px 16px"} borderRadius="10px">
      <Box display="flex" justifyContent="flex-end">
        <ButtonOutlined
          width={"68px"}
          p={"0px 19px"}
          height="22px"
          fontWeight={7}
          fontSize={"10px"}
          letterSpacing={"0.01em"}
          lineHeight={"14px"}
          borderColor={colors.modes.light.danger}
          color={colors.modes.light.danger}
          bg={colors.modes.light.white}
          borderRadius={"3px"}
          hover={colors.modes.light.danger}
          onClick={() => handleBack()}
        >
          Back
        </ButtonOutlined>
      </Box>

      <Row>
        <Col
          className="gutter-row"
          span={8}
          style={{ padding: "20px", display: "block" }}
        >
          <OverviewCard
            indicator={"unresolved"}
            title="Projects Uploaded"
            numericValue={budgetStatitics?.TotalProjectCount}
          />
          <br />
          <OverviewCard
            indicator={"resolved"}
            title="Total Budget Amount"
            numericValue={
              budgetStatitics?.TotalBudgetAmount !== undefined &&
              budgetStatitics?.TotalBudgetAmount.toLocaleString()
            }
          />
          <br />
          <OverviewCard
            indicator={"unresolved"}
            title="Total Number of Anomalies"
            numericValue={
              budgetStatitics?.CountsByStatus?.TotalNumberOfAnomalies
            }
          />
          <br />

          <OverviewCard
            indicator={"unresolved"}
            title="Percentage of Duplicated Projects"
            numericValue={budgetStatitics?.DuplicatedProjectInPercentage}
          />
          <br />

          <div style={style}>
            <div>Number of Projects</div>
            <div style={{ height: "1.5%" }}>
              <Pie {...config} />
            </div>
          </div>
          <br />
        </Col>

        <Col span={16} style={{ padding: "20px" }}>
          <Table
            pagination={{ pageSize: 5 }}
            title={() => "Project Anomalies"}
            columns={columns}
            dataSource={anomaliesData}
            onChange={handlePagination}
          />
        </Col>
      </Row>
    </OtherContentContainer>
  );
};

export default AnalysisViews;
