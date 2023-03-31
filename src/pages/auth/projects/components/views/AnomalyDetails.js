import React from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import TableTopContent from "../../../../../components/TableTopContent";
import { Box } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";
import ProjectWarning from "../projectWarning";

const AnomalyDetails = ({ component }) => {
  return (
    <OtherContentContainer>
      <TableTopContent>
        <Box display="flex">
          <div className="title">
            <p
              className={[
                "header_past_title header_current_title active_title",
              ].join(" ")}
            >
              Anomaly Details
            </p>
          </div>
        </Box>
      </TableTopContent>
      <Box
        padding={"17px 16px 0px 16px"}
        bg={colors.modes.light.white}
        borderRadius="10px"
      >
        {component}

        <ProjectWarning />
      </Box>
    </OtherContentContainer>
  );
};

export default AnomalyDetails;
