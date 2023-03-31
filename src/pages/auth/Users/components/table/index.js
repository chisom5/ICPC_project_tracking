import React from "react";
import { Button, Table, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Text, Img, Box } from "../../../../../components/Primitives";
import {
  openRevokeModal,
  openEditModal,
  openAddModal,
} from "../../../../../services/users/action";
import { fetchDefaultMetaData } from "../../../../../services/metaData/action";
import colors from "../../../../../theme/colors";
import { useNavigate } from "react-router-dom";

const TableComponent = React.memo(
  ({ currentPage, handlePagination, ...props }) => {
    const { usersList, pagingData, isFetching } = useSelector(
      (state) => state.users
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (obj) => {
      props.handleSetCurrentUserObj(obj);
      dispatch(fetchDefaultMetaData(navigate));
      dispatch(
        openEditModal({
          showEditUser: true,
        })
      );
    };
    const handleDelete = (obj) => {
      props.handleSetCurrentUserObj(obj);
      dispatch(
        openRevokeModal({
          revokeUser: true,
        })
      );
    };
    const columns = [
      {
        title: "Full Name",
        dataIndex: "Firstname",
        render: (_, obj) => {
          return (
            <div className="table_display">
              <div className="table_folder_icon">
                <img
                  src={
                    require("../../../../../assets/images/person.svg").default
                  }
                  alt="folder_icon"
                />
              </div>
              <span>{`${obj.Firstname} ${obj.Lastname}`}</span>
            </div>
          );
        },
      },
      { title: "Email", dataIndex: "Email" },
      { title: "Role", dataIndex: "RoleName" },
      {
        title: "Status",
        dataIndex: "StatusId",
        render: (statId) => {
          return statId === 0 ? "Active" : statId === 1 ? "In-Active" : null;
        },
      },

      {
        title: "Action",
        dataIndex: "id",
        render: (id, obj) => {
          return (
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <Text
                        p={"3px 14px"}
                        fontSize={"12px"}
                        fontWeight={5}
                        color={"#00A3A1"}
                        onClick={() => handleEdit(obj)}
                      >
                        Edit
                      </Text>
                    ),
                  },

                  {
                    key: "2",
                    label: (
                      <Text
                        p={"3px 14px"}
                        fontWeight={7}
                        fontSize={"12px"}
                        letterSpacing={"0.01em"}
                        lineHeight={"14px"}
                        color={colors.modes.light.danger}
                        hover={colors.modes.light.danger}
                        onClick={() => handleDelete(obj)}
                      >
                        Delete
                      </Text>
                    ),
                  },
                ],
              }}
            >
              <Img
                src={
                  require("../../../../../assets/images/table-action.svg")
                    .default
                }
              />
            </Dropdown>
          );
        },
      },
    ];

    const newUserAction = () => {
      dispatch(fetchDefaultMetaData(navigate));
      dispatch(openAddModal({ showAddUser: true }));
    };
    return (
      <TableStyle>
        <TableHeader
          bottomPad={true}
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          p="0px"
        >
          <div className="tb_header_inner"></div>
          <Button icon={<PlusOutlined />} onClick={() => newUserAction()}>
            New User
          </Button>
        </TableHeader>
        <Table
          rowKey="Id"
          columns={columns}
          dataSource={usersList}
          loading={isFetching}
          onChange={handlePagination}
          pagination={{
            total: pagingData?.TotalCount,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total.toLocaleString()}`,
            defaultPageSize: 10,
            pageSize: 10,
            defaultCurrent: currentPage,
          }}
        />
      </TableStyle>
    );
  }
);

const TableStyle = styled(Box)`
  background: ${colors.modes.light.white};
  box-shadow: none;

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

const TableHeader = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: auto;
  margin-bottom: 1.2rem;

  .tb_header_inner {
    display: flex;
    width: inherit;

    p {
      font-size: 18px;
      line-height: 23px;
      letter-spacing: -0.02em;
    }
  }

  .ant-btn {
    background: ${colors.modes.light.white};
    border-radius: 3px;
    height: 30px;
    border: 1px solid ${colors.modes.light.danger};
    color: ${colors.modes.light.danger};
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: "0.01em";
  }

  @media (max-width: 1024px) {
  }
`;
export default TableComponent;
