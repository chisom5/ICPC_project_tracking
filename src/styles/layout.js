import styled from "styled-components";
import { Box } from "../components/Primitives";
import colors from "../theme/colors";

export const Container = styled(Box)`
  width: 100%;
  background-color: #f6f6f6;
`;
export const Main = styled.main`
  display: flex;
  padding-top: 70px;
  width: 100%;
  height: 100%;
`;

export const MainContent = styled.section`
  width: 100%;
`;

export const OtherContent = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 4.8rem;

  header,
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;

    .title {
      font-weight: normal;
      font-size: 2.25rem;
      line-height: 43px;
      color: ${colors.modes.light.grayBlack};
    }
  }
`;
export const Content = styled.div`
  width: 100%;
  padding-left: 2rem;
  margin-top: 1.25rem;
  padding-right: 2rem;

  .outlined_tb {
    background: transparent;
    border-radius: 0px;
    border: none;
    padding: 0px;
  }
`;

export const UploadContainer = styled(Box)`
  background: #ffffff;
  border-radius: 10px;
  padding: 21px 42px;
  width: 90%;

  .field-bg {
    .ant-select-selector {
      background: ${colors.modes.light.inputBgColor};
      height: 48px !important;
      border-radius: 4px;
    }

    .ant-textarea {
      background: ${colors.modes.light.inputBgColor};
    }
  }
`;

export const OtherContentContainer = styled(Box)`
  width: 100%;

  .title {
    color: ${colors.modes.light.neuralDark};
    font-weight: 600;
    font-size: 16px;
    line-height: 15px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    position: relative;
    cursor: pointer;
  }
  
  .header_past_title {
    color: rgba(21, 39, 56, 0.25);
    padding-right: 8px;
  }
  .header_current_title {
    border-left: 1.4px solid ${colors.modes.light.danger};
    padding-left: 8px;

    &:first-child {
      border-left: none;
    }
  }
  .active_title {
    color: ${colors.modes.light.neuralDark};
    font-weight: 600;
  }
`;

export const TableWrapper = styled(Box)`
  width: 100%;
  background-color: ${colors.modes.light.white};
  border-radius: 10px;
`;
export const MiniHeaderStyle = styled.div`
  background: ${colors.modes.light.white};
  padding-left: 32px;
  height: 54px;
  border: 1px solid #e8e9eb;
  display: flex;
  justify-content: space-between;

  .title {
    color: ${colors.modes.light.neuralDark};
    font-weight: 600;
    font-size: 16px;
    line-height: 15px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    position: relative;
    cursor: pointer;
  }

  .header_past_title {
    color: rgba(21, 39, 56, 0.25);
    padding-right: 8px;
  }
  .header_current_title {
    border-left: 1.4px solid ${colors.modes.light.danger};
    padding-left: 8px;

    &:first-child {
      border-left: none;
    }
  }
  .active_title {
    color: ${colors.modes.light.neuralDark};
    font-weight: 600;
  }
  .current_title_btab {
    height: 3px;
    width: -webkit-fill-available;
    bottom: 0px;
    position: absolute;
    background: ${colors.modes.light.danger};
    pointer-events: none;
    border-radius: 4px 4px 0px 0px;
  }
  .budget_tab_left {
    left: 155px;
  }
  .contract_tab_left {
    left: 172px;
  }
  .project_tab {
    left: 0.55rem;
    width: 85px;
  }
  .supporting_tab {
    left: 6.8rem;
    width: 175px;
  }
  .project_anomalies {
    left: 18.8rem;
    width: 80px;
  }
  .project_fieldReport {
    left: 24.8rem;
    width: 100px;
  }

  .tabs-nav {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;

    .tabs-nav-wrap {
      position: relative;
      display: flex;
      flex: auto;
      align-self: stretch;
      overflow: hidden;
      white-space: nowrap;
      transform: translate(0);

      .tabs-nav-list {
        position: relative;
        display: flex;
        transition: opacity 0.3s;

        .ant-tabs-tab {
          padding: 16px 0px;
          color: ${colors.modes.light.gray4};
          font-size: 14px;
        }
        .ant-tabs-tab-active {
          font-weight: 700;

          .ant-tabs-tab-btn {
            color: ${colors.modes.light.mainBlack};
          }
        }

        .ant-tabs-ink-bar {
          height: 4px;
          bottom: 0px;
          background: ${colors.modes.light.secondaryPink};
          border-radius: 4px 4px 0px 0px;
        }
      }

      .ant-tabs-ink-bar-animated {
        transition: width 0.3s, left 0.3s, right 0.3s;
      }
    }
  }
`;

export const ModalContainer = styled.div`
  header {
    background: #f2f2f2;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 24px;
    position: absolute;
    top: 0px;
    width: 100%;
    right: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    .modal-title {
      font-style: normal;
      font-weight: 500;
      font-family: KPMG Light;
      font-size: 26px;
      line-height: 33px;
    }

    .close-modal-icon {
      cursor: pointer;
    }
  }
  .modal-mainContent {
    padding-top: 50px;

    .divider {
      border-top: 1px solid #e5e5e5;
      padding-top: 16px;

      #sub_title {
        margin-bottom: 14px;
        letter-spacing: 0.33em;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 10px;
      }
    }
  }
  .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 26px;
  }

  .ant-input,
  .ant-select-selection-item {
    font-weight: 400;
    font-size: 12px;
  }
  .ant-select-selection-placeholder {
    font-size: 12px;
  }
  .ant-form-item {
    margin-bottom: 16px;
  }
`;
