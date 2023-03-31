import React from "react";
import { Box, Img, Text } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";

const OverviewCard = ({title,numericValue, ...props}) => {
  return (
    <Box
      p={"18px 20px"}
      width="23.7%"
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
      {/* <Box display="flex" style={{ gap: "16px" }}>
        <Text fontSize="28px" lineHeight="38px" fontWeight={3}>
          3,441
        </Text>
        <Box display="flex" alignItems="baseline">
          <Img
            src={
              props.indicator === "resolved"
                ? require(`../../../../../assets/images/indicator-resolved.svg`)
                    .default
                : require(`../../../../../assets/images/indicator-unresolved.svg`)
                    .default
            }
          />
          <Box ml={"8px"}>
            <Text
              as="p"
              color={
                props.indicator === "resolved"
                  ? colors.modes.light.success
                  : colors.modes.light.unresolved
              }
            >
              0.3%
            </Text>
            <Text
              color={
                props.indicator === "resolved"
                  ? colors.modes.light.success
                  : colors.modes.light.unresolved
              }
            >
              from last year
            </Text>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};

export default OverviewCard;