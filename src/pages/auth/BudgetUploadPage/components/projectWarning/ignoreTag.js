import React from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Text } from "../../../../../components/Primitives";
import { handleIgnoreOneAnomaly } from "../../../../../services/budgetPage/action";
import colors from "../../../../../theme/colors";
import { LoadingOutlined } from "@ant-design/icons";

const IgnoreTag = ({ clickable, anomalyId, projectId, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isIgnoring } = useSelector((state) => state.budget);
  const { trackingStatus } = useSelector((state) => state.global);

  const handleIgnore = () => {
    if (clickable) {
      if (trackingStatus !== null && trackingStatus?.tracking
        .Status === 1) {
        dispatch(
          handleIgnoreOneAnomaly(
            {
              anomalyId: anomalyId,
              projectId: projectId,
              budgetId: props.budgetId,
            },
            navigate
          )
        );
      } else if (trackingStatus !== null && trackingStatus?.tracking
        .Status >= 2) {
        // dispatch(
        //   handleRequestSuccess(
        //     "Contract Detail / Information is complete for this tracking year."
        //   )
        // );
        return;
      }
    }
  };
  return (
    <Text
      bg={colors.modes.light.yellow}
      borderRadius="3px"
      color="#726006"
      py={"2px"}
      px={"8px"}
      fontSize={"10px"}
      fontWeight={5}
      style={{ cursor: clickable ? "pointer" : "auto" }}
      onClick={handleIgnore}
    >
      {isIgnoring ? (
        <Spin indicator={<LoadingOutlined />} />
      ) : (
        <span>Ignore</span>
      )}
    </Text>
  );
};

export default IgnoreTag;
