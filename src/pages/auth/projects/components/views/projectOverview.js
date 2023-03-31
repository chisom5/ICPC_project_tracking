import React, { useState, useEffect } from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import { Box } from "../../../../../components/Primitives";
import {
  BoxPieChart,
  BoxLineChart,
  MyResponsiveLine,
  MyResponsivePie,
} from "../boxChart";
import OverviewCard from "../card";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBudgetStatistics } from "../../../../../services/budgetPage/action";
import { Pie, measureTextWidth } from "@ant-design/plots";

const ProjectOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { trackingIdFromList} = useSelector(
    (state) => state.projects
  );
  const { budgetStatitics } = useSelector(
    (state) => state.budget
  );

  useEffect(() => {
    Promise.all([
      dispatch(getBudgetStatistics({ TrackingId: trackingIdFromList }, navigate)),
    ]);
  }, []);

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

  const lineData = [
    {
      id: "year",
      data: budgetStatitics?.Trend || []
    },
  ];

  const pieData = [
    {
      id: "resolved",
      label: "Resolved ",
      value: budgetStatitics?.CountsByStatus?.TotalNumberOfResolvedAnomalies,
    },
    {
      id: "unresolved",
      label: "Unresolved",
      value: budgetStatitics?.CountsByStatus?.TotalNumberOfUnresolvedAnomalies,
    },
  ];

 

  const colors = {
    year: "#009A44",
    resolved: "#009A44",
    unresolved: "#96250C",
  };
  const getColor = (line) => colors[line.id];

  return (
    <OtherContentContainer>
      <Box display="flex" width="100%">
        <BoxPieChart
          children={
            <div className="box_content_container">
              <div className="box_content_chart">
                <MyResponsivePie data={pieData} color={getColor} />
              </div>
            </div>
          }
          title="Number of Anomalies"
          width="35%"
          height="auto"
        />

        <BoxLineChart
          children={
            <div className="box_content_container">
              <div className="box_content_chart">
                <MyResponsiveLine data={lineData} color={getColor} />
              </div>
            </div>
          }
          title="Trend of Resolved Anomalies"
          width="65%"
          height="auto"
          dropdownList ={budgetStatitics?.Trend || []}
        />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        style={{ gap: "18px" }}
        mt={"20px"}
        mb={"3rem"}
      >
        <OverviewCard
          indicator={"unresolved"}
          title="Projects Uploaded"
          numericValue={budgetStatitics?.TotalProjectCount}
        />
        <OverviewCard
          indicator={"resolved"}
          title="Total Budget Amount"
          numericValue={
            budgetStatitics?.TotalBudgetAmount !== undefined &&
            "₦ " + budgetStatitics?.TotalBudgetAmount?.toLocaleString()
          }
        />
        <OverviewCard
          indicator={"unresolved"}
          title="Total Contracts Awarded"
          numericValue={budgetStatitics?.TotalContractAwarded}
        />

        <OverviewCard
          indicator={"resolved"}
          title="Total Contract Amount"
          numericValue={ "₦ " +budgetStatitics?.totalContractAmount?.toLocaleString()}
        />

        <OverviewCard
          indicator={"resolved"}
          title="Total Duplicated Project Amount"
          numericValue={
            "₦ " +
            budgetStatitics?.SumOfDuplicatedProjectAmount?.toLocaleString()
          }
        />

        <OverviewCard
          indicator={"unresolved"}
          title="Percentage of Duplicated Projects"
          numericValue={budgetStatitics?.DuplicatedProjectInPercentage}
        />
        <OverviewCard
          indicator={"resolved"}
          title=" Duplicate Contracts"
          numericValue={budgetStatitics?.totalNumberOfDuplicatedAmount}
        />
        <OverviewCard
          indicator={"unresolved"}
          title="Number of Beneficial Ownerships"
          numericValue={budgetStatitics?.TotalNumberOfBeneficiaryOwnerships}
        />
      </Box>
    </OtherContentContainer>
  );
};

export default ProjectOverview;