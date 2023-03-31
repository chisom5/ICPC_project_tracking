import { Table } from "antd";
import React from "react";
import { SearchInput, SelectInput } from "../../../../../components/TextField";
import { ButtonOutlined } from "../../../../../components/Button";
import { Img, Box } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { handleFilterAnomalyRecord } from "../../../../../services/contracts/action";

const TableComponent = ({
  currentPage,
  handlePagination,
  handleBack,
  columns,
}) => {
  const {
    contractView,
    SelectedAnomalData,
    contractAnomaliesData,
    contractInfoTable,
    pagingData,
  } = useSelector((state) => state.contract);
  const dispatch = useDispatch();
  const data =
    contractView === "contractUpload"
      ? contractInfoTable
      : contractView === "anomalies"
      ? contractAnomaliesData
      : contractView === "projectTitle"
      ? SelectedAnomalData
      : [];

  const handleFilter = (e) => {
    if (e !== "All") {
      const num = +e;
      dispatch(handleFilterAnomalyRecord(num));
    } else {
      dispatch(handleFilterAnomalyRecord(e));
    }
  };

  return (
    <TableStyle
      width={contractView === "contractUpload" ? "65%" : "100%"}
      tb_shadow={
        contractView === "contractUpload"
          ? "0px 8px 24px rgba(0, 0, 0, 0.08)"
          : null
      }
      p={contractView === "contractUpload" ? "0px 12px" : null}
    >
      <TableTopHeader
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        p={contractView === "contractUpload" ? "22px 0px 0px 24px" : "0px"}
      >
        <Box display="flex" style={{ gap: "27px" }}>
          {(contractView === "contractUpload" ||
            contractView === "anomalies") && (
            <SearchInput
              placeholder={
                contractView === "contractUpload"
                  ? "Search for File Name"
                  : contractView === "anomalies"
                  ? "Search for Project Name"
                  : ""
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

          {contractView === "anomalies" ? (
            // show select dropdown
            <SelectInput
              selectOptions={[
                { name: "All", value: "All" },
                { name: "Has Anomaly", value: "1" },
                { name: "No Anomaly", value: "0" },
              ]}
              placeholder="Filter Anomalies"
              style={{ width: "170px" }}
              onChange={handleFilter}
            />
          ) : null}
        </Box>

        {contractView !== "contractUpload" ? (
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

            {/* {contractView === "anomalies" && (
              <ButtonOutlined
                width={"68px"}
                p={"0px 19px"}
                height="22px"
                fontWeight={7}
                fontSize={"10px"}
                letterSpacing={"0.01em"}
                lineHeight={"14px"}
                border={"none"}
                color={colors.modes.light.white}
                bg={colors.modes.light.danger}
                borderRadius={"3px"}
              >
                Upload
              </ButtonOutlined>
            )} */}
          </Box>
        ) : null}
      </TableTopHeader>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        //    loading={pathname === "/home" ? isRequestingForAdmin : isRequesting}
        onChange={handlePagination}
        pagination={
          contractView === "contractUpload"
            ? false
            : contractView === "anomalies"
            ? {
                total: pagingData?.TotalCount,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${
                    range[1]
                  } of ${total.toLocaleString()}`,
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

const TableStyle = styled(Box)`
  background: ${colors.modes.light.white};
  box-shadow: ${(props) => (props.tb_shadow ? props.tb_shadow : "none")};
  border-radius: 5px;

  .min-table {
    padding: 0px 0.65rem;
  }

  .ant-table-container {
    table {
      table-layout: auto !important;

      .ant-table-thead > tr > th {
        padding: 12px;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: ${colors.modes.light.tableHead};
      }
      .ant-table-tbody > tr > td {
        padding: 12px 14px;
        font-weight: 400;
        font-size: 11px;
        color: ${colors.modes.light.mainBlack};
        border-bottom: 0.75px solid rgba(8, 21, 33, 0.1);
        letter-spacing: 0.01071em;
      }

      .ant-table-tbody > tr > td {
        .table_display {
          display: flex;
          align-items: center;
          word-break: break-word;

          .text {
            width: 200px;
          }
        }

        .table_folder_icon {
          width: 24px;
          height: 24px;
          background: rgba(246, 141, 46, 0.12);
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 1rem;
        }
        .table_anomalie_icon {
          background: rgba(41, 51, 131, 0.16);
        }
        .table_warning_icon {
          margin-left: 10px;
        }

        .tag_anomal {
          width: 115px;
          background: rgba(255, 219, 219, 1);
          border-radius: 3px;
          display: flex;
          align-items: center;
          padding: 4px 8px;
          cursor: pointer;

          span {
            color: #d10000;
            font-weight: 700;
            font-size: 12px;
          }
        }
        .tag_ignore {
          background: rgba(249, 235, 109, 1);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          cursor: pointer;

          span {
            color: #726006;
            font-weight: 700;
            font-size: 12px;
          }
        }
      }

      .ant-table-tbody > tr > td .col_action_btn {
        display: flex;
      }
      .ant-table-thead > tr > th {
        background: #ffffff;
        color: #737d88;
        text-transform: capitalize;
        line-height: 1rem;
      }

      .ant-table-thead
        > tr
        > th:not(:last-child):not(.ant-table-selection-column):not(
          .ant-table-row-expand-icon-cell
        ):not([colspan]):before {
        content: none;
      }
      .ant-pagination-disabled .ant-pagination-item-link {
        border: none;
      }
    }
  }
  .ant-pagination-total-text {
    flex: 1;
    display: flex;
  }
  .table_action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TableTopHeader = styled(Box)`
  display: flex;
  margin-bottom: 0.65rem;
`;

export default TableComponent;
