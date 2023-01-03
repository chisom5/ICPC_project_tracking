import styled from "styled-components";
import { Box } from "../components/Primitives";
import colors from "../theme/colors";

export const TableStyle = styled(Box)`
  background: ${colors.modes.light.white};
  box-shadow: ${(props)=> props.tb_shadow ? props.tb_shadow : 'none'};
  border-radius: 5px;
`;

export const TableTopHeader =styled(Box)`
display: flex;
`