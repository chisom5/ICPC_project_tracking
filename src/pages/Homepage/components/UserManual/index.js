import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../../components/Primitives";
import { ButtonOutlined } from "../../../../components/Button";
import colors from "../../../../theme/colors";

const ManualWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${colors.modes.light.white};
  border-radius: 10px;
  width: 40%;
  height: 130px;
`;

const UserManual = () => {
  return (
    <ManualWrapper>
      <Text
        mb={"22px"}
        fontSize={4}
        fontWeight={600}
        lineHeight="33px"
        color={colors.modes.light.black1}
      >
        User Manual
      </Text>
      <ButtonOutlined
        borderColor={colors.modes.light.danger}
        color={colors.modes.light.danger}
        style={{ padding: "8px 22px" }}
      >
        Download
      </ButtonOutlined>
    </ManualWrapper>
  );
};

export default UserManual;
