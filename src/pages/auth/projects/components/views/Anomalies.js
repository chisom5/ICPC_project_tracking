import React, { useId, useState } from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import { Box, Label } from "../../../../../components/Primitives";
import TableTopContent from "../../../../../components/TableTopContent";
import { useDispatch, useSelector } from "react-redux";
import { setAnomaliesType } from "../../../../../services/projects/action";

const Anomalies = ({ children }) => {
  const { anomalies_type } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const id = useId();

  const changeAnomaliesType = (item) => {
    dispatch(setAnomaliesType({ anomalies_type: item }));
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
                ].join(" ")}
                key={`${id}-${item}`}
                onClick={() => changeAnomaliesType(item)}
              >
                {item}
              </p>
            ))}
          </div>
        </Box>
        <Box></Box>
      </TableTopContent>
      {children}
    </OtherContentContainer>
  );
};

export default Anomalies;
