import React from "react";
import { Box, Img, Text } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";

const OverviewCard = ({ title, numericValue, ...props }) => {
  return (
    <Box
      p={"18px 20px"}
      width="100%"
      bg={colors.modes.light.white}
      border="1px solid #DDDDDD"
      borderRadius="3px"
    >
      <Text
        as="p"
        color="#58595B"
        fontSize="12px"
        fontWeight={3}
        lineHeight="16px"
        mb="8px"
      >
        {title}
      </Text>
      <Box display="flex" style={{ gap: "16px" }}>
        <Text fontSize="28px" lineHeight="38px" fontWeight={3}>
          {numericValue}
        </Text>
      </Box>
    </Box>
  );
};

export default OverviewCard;
