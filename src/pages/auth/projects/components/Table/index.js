import { Table } from "antd";
import React from "react";
import { TableStyle, TableTopHeader } from "../../../../../styles/budgetStyle";
import { SearchInput } from "../../../../../components/TextField";
import { Img, Box, Text } from "../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../components/Button";
import colors from "../../../../../theme/colors";
import { AnomaliesData } from "../data";
import { useDispatch, useSelector } from "react-redux";

const TableComponent = ({
  currentPage,
  handlePagination,
  handleBack,
  columns,
  ...props
}) => {
  const {
    currentTab,
    isFetching,
    isRequesting,
    anomalies_type,
    allProjectCycle,
    pagingData,
    fieldReportList,
    SelectedAnomalRecord,
    projectListData,
    supportingDocumentData,
    projectAnomaliesList,
  } = useSelector((state) => state.projects);

  const dispatch = useDispatch();
  const data =
    currentTab === "Project Tracking Instances"
      ? allProjectCycle
      : currentTab === "Anomalies" && anomalies_type === "projectTitle"
      ? SelectedAnomalRecord
      : currentTab === "Anomalies" && anomalies_type === "anomalyTable"
      ? projectAnomaliesList
      : currentTab === "Project List"
      ? projectListData
      : currentTab === "Supporting Documents"
      ? supportingDocumentData
      : currentTab === "Field Reports"
      ? fieldReportList
      : AnomaliesData;

  return (
    <TableStyle
      width={
        currentTab.includes("Documents") || currentTab.includes("Field Reports")
          ? "65%"
          : "100%"
      }
      tb_shadow={
        currentTab.includes("Documents") || currentTab.includes("Field Reports")
          ? "0px 8px 24px rgba(0, 0, 0, 0.08)"
          : null
      }
    >
      <TableTopHeader
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        p={
          currentTab.includes("Documents") ||
          currentTab.includes("Field Reports")
            ? "22px 0px 0px 24px"
            : "0px"
        }
      >
        <Box display="flex" style={{ gap: "27px" }} width="100%">
          {currentTab.includes("Anomalies") &&
          anomalies_type.includes("projectTitle") ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text>{SelectedAnomalRecord[0]?.projectTitle}</Text>
            </Box>
          ) : (
            <SearchInput
              placeholder={
                currentTab.includes("Field Reports") ||
                currentTab.includes("Documents")
                  ? "Search for File Name"
                  : currentTab.includes("Instances")
                  ? "Search for Project Tracking Cycle"
                  : "Search for Project Name"
              }
              before={
                <Img
                  src={
                    require("../../../../../assets/images/bx-search.svg")
                      .default
                  }
                />
              }
              height={"32px"}
              bg={colors.modes.light.inputBgColor}
              border={"1px solid #D3D5D7"}
            />
          )}

          {(currentTab.includes("Field Reports") ||
            currentTab.includes("Documents")) && (
            <SearchInput
              placeholder={"Search Description"}
              before={
                <Img
                  src={
                    require("../../../../../assets/images/bx-search.svg")
                      .default
                  }
                />
              }
              height={"32px"}
              bg={colors.modes.light.inputBgColor}
              border={"1px solid #D3D5D7"}
            />
          )}
        </Box>
        {/* back butn */}
        {currentTab.includes("List") && (
          <Box display="flex" style={{ gap: "16px" }}>
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
        )}
        {currentTab.includes("Anomalies") &&
          anomalies_type.includes("projectTitle") && (
            // projectTitle
            <Box display="flex" style={{ gap: "16px" }}>
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
          )}
      </TableTopHeader>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        className={
          currentTab.includes("Documents") ||
          currentTab.includes("Field Reports")
            ? "min-table"
            : null
        }
        loading={isFetching || isRequesting}
        onChange={handlePagination}
        pagination={
          (currentTab === "Anomalies" && anomalies_type === "projectTitle") ||
          (currentTab === "Anomalies" && anomalies_type === "anomalyTable")
            ? false
            : currentTab === "Field Reports" ||
              currentTab === "Supporting Documents" 
            ? {
                total: pagingData?.TotalCount,
                defaultPageSize: 3,
                pageSize: 3,
                defaultCurrent: currentPage,
              }
            : {
                total: pagingData?.TotalCount,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${
                    range[1]
                  } of ${total.toLocaleString()}`,
                defaultPageSize: 10,
                pageSize: 10,
                defaultCurrent: currentPage,
              }
        }
      ></Table>
    </TableStyle>
  );
};

export default TableComponent;
