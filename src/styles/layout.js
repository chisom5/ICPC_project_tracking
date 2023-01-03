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
  padding-left: 4.5rem;

  header,
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;

    .title {
      font-family: KPMG App;
      font-weight: normal;
      font-size: 2.25rem;
      line-height: 43px;
      color: ${colors.modes.light.grayBlack};
    }
  }
`;
export const Content = styled.div`
  width: 100%;
  padding-left: 3rem;
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
  padding: 21px 51px;
  width: 90%;

  .field-bg {
    .ant-select-selector {
      background: ${colors.modes.light.inputBgColor};
    }
  }
`;

export const OtherContentContainer = styled(Box)`
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
`;

export const MiniHeaderStyle = styled.div`
  background: ${colors.modes.light.white};
  padding: ${(props) =>
    props["no-bPad"] ? " 20px 48px 0px 32px" : "20px 48px 20px 32px"};
  height: auto;
  border: 1px solid #e8e9eb;
  display: flex;
  justify-content: space-between;

  .title {
    // font-family: KPMG Light;
    color: ${colors.modes.light.neuralDark};
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
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
