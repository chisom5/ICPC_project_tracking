import React from "react";
import { Text } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";

const IgnoreTag = () => {
  return (
    <Text
      bg={colors.modes.light.yellow}
      borderRadius="3px"
      color="#726006"
      py={"2px"}
      px={"8px"}
      fontSize={'10px'}
      fontWeight={5}
    >
      <span>Ignore</span>
    </Text>
  );
};

export default IgnoreTag;
