import { Table } from "antd";
import React from "react";
import { TableStyle, TableTopHeader } from "../../../../../styles/budgetStyle";
import { SearchInput } from "../../../../../components/TextField";
import { Img, Box } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";
import { BudgetData, AnomaliesData } from "../data";
import { useDispatch, useSelector } from "react-redux";

const TableComponent = ({ currentPage, handlePagination, columns }) => {
  const { currentTab } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const data = AnomaliesData;

  return (
    <TableStyle
      width={currentTab.includes("Documents") || currentTab.includes("Field Reports") ? "65%" : "100%"}
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
        p={currentTab.includes("Documents") || currentTab.includes("Field Reports") ? "22px 0px 0px 24px" : "0px"}
      >
        <Box display="flex" style={{ gap: "27px" }}>
          <SearchInput
            placeholder={"Search for Project Name"}
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
        </Box>
      </TableTopHeader>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        //    loading={pathname === "/home" ? isRequestingForAdmin : isRequesting}
        onChange={handlePagination}
        pagination={{
          total: data?.length,
          defaultPageSize: currentTab.includes("Documents") || currentTab.includes("Field Reports") ? 3 : 10,
          pageSize: currentTab.includes("Documents")|| currentTab.includes("Field Reports") ? 3 : 10,
          defaultCurrent: currentPage,
        }}
      ></Table>
    </TableStyle>
  );
};

export default TableComponent;
