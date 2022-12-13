import { useId } from "react";
import styled from "styled-components";
import { base } from "../../../styles/baseStyle";

const BreadcrumbStyle = styled.nav`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;

  ol {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ol li {
    display: inline-flex;
    cursor: pointer;
  }
  .breadcrumb-link {
    font-weight: 600;
    font-size: 12px;
    color: #005eb8;
    line-height: 120.6%;
    display: flex;
    align-items: center;
    text-decoration-line: underline;
  }
  .breadcrumb-separator {
    margin: 0 8px;
    color: #666666;
    font-weight: 600;
    font-size: 12px;
  }
  ${base}
`;

const Breadcrumb = ({ list, goBack }) => {
  const id = useId();


  return (
    <BreadcrumbStyle>
      <ol>
        {list?.map((i) => (
          <li key={`${id}-${i}`} onClick={() => goBack()}>
            <span className="breadcrumb-link">{i}</span>
            <span className="breadcrumb-separator">/</span>
          </li>
        ))}
      </ol>
    </BreadcrumbStyle>
  );
};

export default Breadcrumb;
