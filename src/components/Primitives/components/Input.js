import styled from "styled-components";
import { base } from "../../../styles/baseStyle";

const Input = styled.input`
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.borderColor};
  background-color: ${(props) => props.theme.colors.selectBox};
  border-radius: 4px;
  height: 52px;
  flex: 1 0 auto;
  padding: 8px 22px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.blue};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.disabled};
  }

  &::placeholder {
    font-weight: 400;
    font-size: 11px;
    color: ${(props) =>
      props.disabled ? "#B0B3B8" : props.theme.colors.placeholderColor};
  }

  ${base}
`;

Input.defaultProps = {
  my: 2,
  fontSize: 1,
  color: "inputColor",
  fontWeight: 4,
};

export default Input;
