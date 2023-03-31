import React from "react";
import { useSelector } from "react-redux";
import { Box, Img, Text } from "../../../../../components/Primitives";
import colors from "../../../../../theme/colors";
import IgnoreTag from "./ignoreTag";

const ProjectWarning = () => {
  const { AnomalData } = useSelector((state) => state.contract);

  const extractAnomalData = () => {
    let d = AnomalData.filter((i) => i.IgnoreAnomaly === 0);
    return d;
  };
  return (
    <>
      {AnomalData.length !== 0 && extractAnomalData().length !== 0 && (
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
            <Img
              src={require("../../../../../assets/images/info.svg").default}
            />

            <Text
              color={colors.modes.light.white}
              fontSize={"12px"}
              fontWeight={4}
            >
              <Text as="p">
                Please review the system generated anomalies below. Click{" "}
                <Text
                  bg={colors.modes.light.yellow}
                  borderRadius="3px"
                  color="#726006"
                  py={"2px"}
                  px={"8px"}
                  fontSize={"10px"}
                  fontWeight={5}
                  mr={"3px"}
                >
                  <span>Ignore</span>
                </Text>
                if an anomaly is invalid.
              </Text>

              <Text as="p">
                {/* Click{" "}
         <IgnoreTag /> {" "}
          if an anomaly is invalid.  */}
                {/* , otherwise, perform the necessary updates
          to the budget upload file, then click the 'Back' button above to{" "} */}
              </Text>
              {/* <Text as="p">
          navigate to the upload page. Please note that upload is only
          permitted when all identified anomalies have been addressed.
        </Text> */}
            </Text>
          </Box>

          <Box mt={"27px"}>
            {AnomalData?.map((item) => {
              if (item.IgnoreAnomaly === 0)
                return (
                  <Box
                    display="flex"
                    alignItems="center"
                    style={{ gap: "12px" }}
                    mb={"1.438rem"}
                    key={item.Id}
                  >
                    <Img
                      src={
                        require("../../../../../assets/images/tb_warning.svg")
                          .default
                      }
                    />
                    <Text>{item.Description}</Text>
                    <IgnoreTag
                      clickable
                      anomalyId={item.Id}
                      projectId={item.TempProjectId}
                      budgetId={item.BudgetId}
                    />
                  </Box>
                );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};
export default ProjectWarning;
