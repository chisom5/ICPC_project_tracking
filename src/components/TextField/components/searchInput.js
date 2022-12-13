import React from "react";
import { Input, Adornment,Box } from "../../Primitives";

const SearchInput = ({ before, disabled, style, ...props }) => (
  <Box display="flex" alignItems="center" position="relative" style={style}>
    {before && (
      <Adornment left="0" pl={2} disabled={disabled}>
        {before}
      </Adornment>
    )}
    <Input
      disabled={disabled}
      py={2}
      pl={before ? "22px" : 2}
      {...props}
    />
  </Box>
);

export default SearchInput;
