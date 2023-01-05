import React from "react";
import { Box } from "../Primitives";

const TableTopContent = ({ children }) => {
  return (
    <Box display="flex" justifyContent='space-between'  mb={3}>
      {children}
    </Box>
  );
};

export default TableTopContent;
