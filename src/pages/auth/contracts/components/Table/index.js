import { Table, Dropdown, Menu } from "antd";
import React from "react";
import { TableStyle, TableTopHeader } from "../../../../../styles/budgetStyle";
import { SearchInput, SelectInput } from "../../../../../components/TextField";
import { ButtonOutlined } from "../../../../../components/Button";
import { Img, Box } from "../../../../../components/Primitives";
import SVG from "react-inlinesvg";
import colors from "../../../../../theme/colors";
import { BudgetData, AnomaliesData } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentView } from "../../../../../services/global/action";

const TableComponent = ({ currentPage, handlePagination, handleBack }) => {
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

  const reviewAnomal = (obj) => {
    console.log(obj);
    dispatch(
      setCurrentView({ currentView: "projectTitle", SelectedAnomalData: [obj] })
    );
  };

  const columns =
    currentView === "budget"
      ? [
          {
            title: "S/N",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
          },
          {
            title: "Data File",
            dataIndex: "dataFile",
            sorter: (a, b) => a.dataFile - b.dataFile,
          },
          {
            title: "Budget Year",
            dataIndex: "budgetYear",
            sorter: (a, b) => a.budgetYear - b.budgetYear,
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (id, obj) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <p style={{ cursor: "pointer" }}>Download</p>,
                      },
                      {
                        key: "2",
                        label: <p style={{ cursor: "pointer" }}>Remove</p>,
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <div className="table_action">
                    <SVG
                      src={
                        require("../../../../../assets/images/table-action.svg")
                          .default
                      }
                      alt="action"
                    />
                  </div>
                </Dropdown>
              );
            },
          },
        ]
      : [
          {
            title: "Project Title",
            dataIndex: "projectTitle",
            sorter: (a, b) => a.projectTitle - b.projectTitle,
            render: (projectTitle, obj) => {
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
                  <span>{projectTitle}</span>

                  {obj.errorAnomaly && (
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
            dataIndex: "projectCode",
            sorter: (a, b) => a.projectCode - b.projectCode,
          },
          {
            title: "Project Type",
            dataIndex: "projectType",
            sorter: (a, b) => a.projectType - b.projectType,
          },

          {
            title: "Budget Amount",
            dataIndex: "budgetAmount",
            sorter: (a, b) => a.budgetAmount - b.budgetAmount,
          },

          {
            title: "Sector",
            dataIndex: "sector",
            sorter: (a, b) => a.sector - b.sector,
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (id, obj) => {
              return (
                <>
                  {obj.errorAnomaly && (
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
        ];
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
              placeholder='Filter Anomalies'
              style={{width: '212px'}}
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
        pagination={currentView !== 'projectTitle' ? {
          total: data?.length,
          defaultPageSize: 10,
          pageSize: 10,
          defaultCurrent: currentPage,
        } : false}
      ></Table>
    </TableStyle>
  );
};

export default TableComponent;
