import styled from "styled-components";
import { Box } from "../components/Primitives";
import colors from "../theme/colors";

export const TableStyle = styled(Box)`
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
        padding: 12px 9px;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: ${colors.modes.light.tableHead};
      }
      .ant-table-tbody > tr > td {
        padding: 12px 9px;
        font-weight: 400;
        font-size: 12px;
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

        .tag_success {
          background: #def0de;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: fit-content;
          padding: 2px 8px 2px 8px;
          gap: 6px;
          color: #269924;
          font-weight: 600;
          border: none;
        }
        .tag_warning {
          background: #fde8d5;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: fit-content;
          padding: 2px 8px 2px 8px;
          gap: 6px;
          color: #f68d2e;
          font-weight: 600;
          border: none;
        }

        .icon{
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .iconSuccessColor{
          background: #269924;
        }
        .iconWarningColor{
          background: #F68D2E;
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
  .table_action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const TableTopHeader = styled(Box)`
  display: flex;
  margin-bottom: 0.65rem;
`;
