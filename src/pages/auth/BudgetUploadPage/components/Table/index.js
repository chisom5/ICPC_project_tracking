import { Table, Dropdown, Menu } from "antd";
import React from "react";
import { TableStyle, TableTopHeader } from "../../../../../styles/budgetStyle";
import { SearchInput } from "../../../../../components/TextField";
import { ButtonOutlined } from "../../../../../components/Button";
import { Img, Box } from "../../../../../components/Primitives";
import SVG from "react-inlinesvg";
import colors from "../../../../../theme/colors";
import { Data } from "../data";

const TableComponent = ({
  currentPage,
  handlePagination,
  currentView,
  handleBack,
}) => {
  const data = Data;
  const columns = [
    {
      title: "S/N",
      dataIndex: "RefNO",
      sorter: (a, b) => a.RefNO - b.RefNO,
      //   render: (name) => {
      //     return (
      //       <div className="table_display">

      //         <span>{name}</span>
      //       </div>
      //     );
      //   },
    },
    {
      title: "Data File",
      dataIndex: "RefNO",
      sorter: (a, b) => a.RefNO - b.RefNO,
    },
    {
      title: "Budget Year",
      dataIndex: "RefNO",
      sorter: (a, b) => a.RefNO - b.RefNO,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, obj) => {
        return (
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    key: "1",
                    label: <p style={{ cursor: "pointer" }}>View</p>,
                  },
                  {
                    key: "2",
                    label: <p style={{ cursor: "pointer" }}>Download</p>,
                  },
                  {
                    key: "3",
                    label: <p style={{ cursor: "pointer" }}>Remove</p>,
                  },
                ]}
              />
            }
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
  ];
  return (
    <TableStyle
      width={currentView === "budget" ? "65%" : "100%"}
      tb_shadow={
        currentView === "budget" ? "0px 8px 24px rgba(0, 0, 0, 0.08);" : null
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
          <SearchInput
            placeholder="Search Description"
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
            Close
          </ButtonOutlined>
        ) : null}
      </TableTopHeader>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        //    loading={pathname === "/home" ? isRequestingForAdmin : isRequesting}
        onChange={handlePagination}
        pagination={{
          total: data?.length,
          defaultPageSize: 10,
          pageSize: 10,
          defaultCurrent: currentPage,
        }}
      ></Table>
    </TableStyle>
  );
};

export default TableComponent;
