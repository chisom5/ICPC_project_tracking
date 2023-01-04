import React from "react";
import { Box, Img, Text } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";
import IgnoreTag from './ignoreTag';

const ProjectWarning = () => {
  return (
    <Box display="flex" flexDirection="column" mt="32px">
      <Box
        bg="#30304A"
        borderRadius="10px"
        padding={"14px 21px 14px 21px"}
        style={{ gap: "12px" }}
        display="flex"
        alignItems="center"
        height="auto"
        width="80%"
      >
        <Img src={require("../../../../../assets/images/info.svg").default} />

        <Text color={colors.modes.light.white} fontSize={'12px'} fontWeight={4}>
          <Text as="p">
            Please review the system generated anomalies below.
          </Text>

          <Text as="p">
            Click{" "}
           <IgnoreTag /> {" "}
            if an anomaly is invalid, otherwise, perform the necessary updates
            to the budget upload file, then click the 'Back' button above to{" "}
          </Text>
          <Text as="p">
            navigate to the upload page. Please note that upload is only
            permitted when all identified anomalies have been addressed.
          </Text>
        </Text>
      </Box>

      <Box mt={"27px"}>
        <Box
          display="flex"
          alignItems="center"
          style={{ gap: "12px" }}
          mb={"1.438rem"}
        >
          <Img
            src={require("../../../../../assets/images/tb_warning.svg").default}
          />
          <Text>
            Duplicate project: at least one other project exists with the same
            name.
          </Text>
          <IgnoreTag />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          style={{ gap: "12px" }}
          mb={"1.438rem"}
        >
          <Img
            src={require("../../../../../assets/images/tb_warning.svg").default}
          />
          <Text>More than one other project has the same budget amount.</Text>
          <IgnoreTag />
        </Box>
      </Box>
    </Box>
  );
};
export default ProjectWarning;
