import React, { useId, useState } from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import { Box } from "../../../../../components/Primitives";
import TableTopContent from "../../../../../components/TableTopContent";
import SelectComponent from "../select";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnomaliesType,
  handleDownloadAnomaliesReport,
} from "../../../../../services/projects/action";
import { useNavigate } from "react-router-dom";

const Anomalies = ({ children }) => {
  const { anomalies_type, projectId } = useSelector((state) => state.projects);
  const { authUser } = useSelector((state) => state.global);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useId();

  const changeAnomaliesType = (item) => {
    if (item === "Anomalies") {
      dispatch(setAnomaliesType({ anomalies_type: "anomalyTable" }));
    } else {
      dispatch(setAnomaliesType({ anomalies_type: item }));
    }
  };

  const handleChange = (value) => {
    if (value === "PDF") {
    } else {
      // excel type.
      // this is saying unauthorize
      dispatch(
        handleDownloadAnomaliesReport(
          { projectTrackingId: projectId },
          navigate
        )
      );
    }
  };
  return (
    <OtherContentContainer>
      <TableTopContent>
        <Box display="flex">
          <div className="title">
            {["Overview", "Anomalies"]?.map((item) => (
              <p
                className={[
                  "header_past_title header_current_title",
                  anomalies_type === item ? "active_title" : null,
                  anomalies_type === "anomalyTable" && item === "Anomalies"
                    ? "active_title"
                    : null,
                ].join(" ")}
                key={`${id}-${item}`}
                onClick={() => changeAnomaliesType(item)}
              >
                {item}
              </p>
            ))}
          </div>
        </Box>

        {authUser !== null && authUser.roleName === "CEPTG" && (
          <Box display="flex" style={{ gap: "16px" }}>
            {anomalies_type.includes("Overview") ? null : (
              <SelectComponent
                handleChange={handleChange}
                placeholder="Export Report"
                selectOptions={[
                  {
                    value: "PDF",
                    label: "PDF",
                  },
                  {
                    value: "Excel",
                    label: "Excel",
                  },
                ]}
              />
            )}
          </Box>
        )}
      </TableTopContent>
      {children}
    </OtherContentContainer>
  );
};

export default Anomalies;
