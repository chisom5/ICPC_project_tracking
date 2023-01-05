import { Table } from "antd";
import React from "react";
import { TableStyle, TableTopHeader } from "../../../../../styles/budgetStyle";
import { SearchInput, SelectInput } from "../../../../../components/TextField";
import { ButtonOutlined } from "../../../../../components/Button";
import { Img, Box } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";
import { BudgetData, AnomaliesData } from "../data";
import { useDispatch, useSelector } from "react-redux";

const TableComponent = ({
  currentPage,
  handlePagination,
  handleBack,
  columns,
}) => {
  const { currentView, SelectedAnomalData } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const data =
    currentView === "budget"
      ? BudgetData
      : currentView === "anomalies"
      ? AnomaliesData
      : SelectedAnomalData;

  return (
    <TableStyle
      width={currentView === "budget" ? "65%" : "100%"}
      tb_shadow={
        currentView === "budget" ? "0px 8px 24px rgba(0, 0, 0, 0.08)" : null
      }
    >
      <TableTopHeader
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        p={currentView === "budget" ? "22px 0px 0px 24px" : "0px"}
      >
        <Box display="flex" style={{ gap: "27px" }}>
          <SearchInput
            placeholder={
              currentView === "budget"
                ? "Search for File Name"
                : currentView === "anomalies"
                ? "Search for Project Name"
                : ""
            }
            before={
              <Img
                src={
                  require("../../../../../assets/images/bx-search.svg").default
                }
              />
            }
            height={"32px"}
            bg={colors.modes.light.inputBgColor}
            border={"1px solid #D3D5D7"}
          />

          {currentView === "anomalies" ? (
            // show select dropdown
            <SelectInput
              selectOptions={[]}
              placeholder="Filter Anomalies"
              style={{ width: "212px" }}
            />
          ) : currentView === "budget" ? (
            <SearchInput
              placeholder="Search Description"
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
          ) : null}
        </Box>

        {currentView !== "budget" ? (
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
            {currentView === "anomalies" ? "Close" : "Back"}
          </ButtonOutlined>
        ) : null}
      </TableTopHeader>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        //    loading={pathname === "/home" ? isRequestingForAdmin : isRequesting}
        onChange={handlePagination}
        pagination={
          currentView !== "projectTitle"
            ? {
                total: data?.length,
                defaultPageSize: 10,
                pageSize: 10,
                defaultCurrent: currentPage,
              }
            : false
        }
      ></Table>
    </TableStyle>
  );
};

export default TableComponent;
