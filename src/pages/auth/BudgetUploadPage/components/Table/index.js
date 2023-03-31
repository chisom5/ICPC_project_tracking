import React, { useState } from "react";
import { Table, Spin } from "antd";
import { SearchInput, SelectInput } from "../../../../../components/TextField";
import { ButtonOutlined } from "../../../../../components/Button";
import { Img, Box, Text } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteBudget,
  setCurrentView,
  fetchAnomalyReviewByProjectId,
  handleIgnoreAllAnomalies,
  handleErrorRequest,
  handleFilterAnomalyRecord,
} from "../../../../../services/budgetPage/action";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { accountingFormat } from "../../../../../utils";

const TableComponent = ({
  currentPage,
  data,
  handlePagination,
  handleBack,
  handleUploadBudget,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { trackingStatus } = useSelector((state) => state.global);
  const {
    isDeleting,
    isUploading,
    isFetching,
    currentView,
    AnomalData,
    pagingData,
    isRequesting,
    isIgnoringAll,
    projectTrackingList
  } = useSelector((state) => state.budget);
  const [removeId, setRemoveId] = useState(null);

  const reviewAnomal = (obj) => {
    dispatch(
      fetchAnomalyReviewByProjectId({ projectId: obj.Id }, navigate)
    ).then(() => {
      dispatch(
        setCurrentView({
          currentView: "projectTitle",
          SelectedAnomalData: [obj],
        })
      );
    });
  };

  const ignoreAllAnomal = (obj) => {
    // check status first.
    if (trackingStatus !== null && trackingStatus?.tracking.Status === 1) {
      dispatch(handleIgnoreAllAnomalies({ projectId: obj.Id }, navigate));
    } else if (
      trackingStatus !== null &&
      trackingStatus?.tracking.Status >= 2
    ) {
      // dispatch(handleErrorRequest('Budget Upload is Complete for this tracking year.'))
      return;
    }
  };
  const handleRemove = (obj) => {
    if (trackingStatus !== null && trackingStatus?.tracking.Status !== 1) {
      return;
    } else {
      setRemoveId(obj.Id);
      const params = {
        Id: obj?.Id,
      };

      dispatch(handleDeleteBudget(params, navigate));
    }
  };

  const handleFilter = (e) => {
    if (e !== "All") {
      const num = +e;
      dispatch(handleFilterAnomalyRecord(num));
    } else {
      dispatch(handleFilterAnomalyRecord(e));
    }
  };

  const extractAmountFilter = () => {
    let res = [];

    projectTrackingList?.map((item) => {
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

  const columns =
    currentView === "budget"
      ? [
          {
            title: "Budget Type",
            dataIndex: "BudgetType",
            sorter: (a, b) => a.BudgetType - b.BudgetType,
            render: (type) => {
              return (
                <Text>
                  {type === 1
                    ? "Executive Budget"
                    : type === 2
                    ? "Constituency Budget"
                    : type === 3
                    ? "Other Projects"
                    : null}
                </Text>
              );
            },
          },
          {
            title: "Budget Year",
            dataIndex: "BudgetYear",
            sorter: (a, b) => a.BudgetYear.length - b.BudgetYear.length,
            render: (year) => {
              return year === 0 ? "-" : year;
            },
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (id, obj) => {
              return (
                <ButtonOutlined
                  width={"auto"}
                  p={"0px 12px"}
                  height="22px"
                  letterSpacing={"0.01em"}
                  lineHeight={"14px"}
                  borderRadius={"4px"}
                  borderColor={colors.modes.light.danger}
                  color={colors.modes.light.danger}
                  bg={colors.modes.light.white}
                  hover={colors.modes.light.danger}
                  disabled={
                    trackingStatus !== null &&
                    trackingStatus?.tracking.Status !== 1
                      ? true
                      : false
                  }
                  style={{
                    cursor:
                      trackingStatus !== null &&
                      trackingStatus?.tracking.Status !== 1
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() => handleRemove(obj)}
                >
                  {isDeleting && removeId !== null && removeId === obj.Id ? (
                    <Spin indicator={<LoadingOutlined />} />
                  ) : (
                    "Remove"
                  )}
                </ButtonOutlined>
              );
            },
          },
        ]
      : currentView === "anomalies"
      ? [
          {
            title: "Project Title",
            dataIndex: "Name",
            sorter: (a, b) =>
              a.Name !== null &&
              a.Name.length - b.Name !== null &&
              b.Name.length,
            render: (Name, obj) => {
              return (
                <div className="table_display">
                  <div className="table_folder_icon">
                    <Img
                      src={
                        require("../../../../../assets/images/tb_projectTitle.svg")
                          .default
                      }
                      alt="folder_icon"
                    />
                  </div>
                  <span className="text">{Name}</span>

                  {obj.HasAnomaly === 1 && obj.IgnoreAnomaly === 0 && (
                    <div className="table_warning_icon">
                      <Img
                        src={
                          require("../../../../../assets/images/tb_warning.svg")
                            .default
                        }
                        alt="folder_icon"
                      />
                    </div>
                  )}
                </div>
              );
            },
          },
          {
            title: "Project Code",
            dataIndex: "Code",
            sorter: (a, b) =>
              a.Code !== null &&
              a.Code.length - b.Code !== null &&
              b.Code.length,
          },
          {
            title: "Project Type",
            dataIndex: "Type",
            sorter: (a, b) => a.Type - b.Type,
            render: (type) => {
              return (
                <div>{type === 1 ? "Hard" : type === 0 ? "Soft" : null}</div>
              );
            },
          },

          {
            title: "Budget Amount",
            dataIndex: "Amount",
            sorter: (a, b) => a.Amount - b.Amount,
            render: (amt) => {
              return accountingFormat(amt);
            },
            filters: extractAmountFilter(),
            onFilter: (value, record) => {
              return record.Amount === value;
            },
          },

          {
            title: "Action",
            dataIndex: "id",
            render: (id, obj) => {
              return (
                <>
                  {obj.HasAnomaly === 0 ||
                  (obj.HasAnomaly === 1 && obj.IgnoreAnomaly === 1) ? null : (
                    <div
                      className="tag_anomal"
                      onClick={() => reviewAnomal(obj)}
                    >
                      <span>Review Anomaly</span>
                    </div>
                  )}
                </>
              );
            },
          },
        ]
      : currentView === "projectTitle"
      ? [
          {
            title: "Project Title",
            dataIndex: "Name",
            render: (Name, obj) => {
              return (
                <div className="table_display">
                  <div className="table_folder_icon">
                    <Img
                      src={
                        require("../../../../../assets/images/tb_projectTitle.svg")
                          .default
                      }
                      alt="folder_icon"
                    />
                  </div>
                  <span className="text">{Name}</span>

                  {obj.HasAnomaly === 0 ||
                  (obj.HasAnomaly === 1 && obj.IgnoreAnomaly === 1) ? null : (
                    <div className="table_warning_icon">
                      <Img
                        src={
                          require("../../../../../assets/images/tb_warning.svg")
                            .default
                        }
                        alt="folder_icon"
                      />
                    </div>
                  )}
                </div>
              );
            },
          },
          {
            title: "Project Code",
            dataIndex: "Code",
          },
          {
            title: "Project Type",
            dataIndex: "Type",
            render: (type) => {
              return (
                <div>{type === 1 ? "Hard" : type === 0 ? "Soft" : null}</div>
              );
            },
          },

          {
            title: "Budget Amount",
            dataIndex: "Amount",
            render: (amt) => {
              return accountingFormat(amt);
            },
          },

          {
            title: "Action",
            dataIndex: "id",
            render: (id, obj) => {
              return (
                <>
                  {obj.HasAnomaly === 0 ||
                  (obj.HasAnomaly === 1 && obj.IgnoreAnomaly === 1) ? null : (
                    <div
                      className="tag_ignore"
                      onClick={() => ignoreAllAnomal(obj)}
                    >
                      {isIgnoringAll ? (
                        <Spin indicator={<LoadingOutlined />} />
                      ) : (
                        <span>Ignore All</span>
                      )}
                    </div>
                  )}
                </>
              );
            },
          },
        ]
      : null;
  return (
    <TableStyle
      width={currentView === "budget" ? "65%" : "100%"}
      tb_shadow={
        currentView === "budget" ? "0px 8px 24px rgba(0, 0, 0, 0.08)" : null
      }
      p={currentView === "budget" ? "0px 12px" : null}
    >
      <TableTopHeader
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        p={currentView === "budget" ? "22px 0px 0px 24px" : "0px"}
      >
        <Box display="flex" style={{ gap: "27px" }}>
          {currentView !== "projectTitle" && (
            <SearchInput
              placeholder={
                currentView === "budget"
                  ? "Search for Budget Type"
                  : currentView === "anomalies"
                  ? "Search for Project Title"
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
          {currentView === "anomalies" && (
            <SelectInput
              selectOptions={[
                { name: "All", value: "All" },
                { name: "Has Anomaly", value: "1" },
                { name: "No Anomaly", value: "0" },
              ]}
              placeholder="Select Anomaly Type"
              style={{
                width: "170px",
                borderRadius: "4px",
              }}
              onChange={handleFilter}
            />
          )}
        </Box>

        {currentView !== "budget" ? (
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

            {currentView === "anomalies" && (
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
                onClick={() => handleUploadBudget()}
              >
                {isUploading ? (
                  <Spin indicator={<LoadingOutlined />} />
                ) : (
                  "Upload"
                )}
              </ButtonOutlined>
            )}
          </Box>
        ) : null}
      </TableTopHeader>
      <Table
        rowKey="Id"
        columns={columns}
        dataSource={data !== null && data}
        loading={currentView === "budget" ? isFetching : isRequesting}
        onChange={handlePagination}
        pagination={
          currentView === "budget"
            ? {
                total: data?.length,
                defaultPageSize: 3,
                pageSize: 3,
                defaultCurrent: currentPage,
              }
            : currentView === "anomalies"
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
      />
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
