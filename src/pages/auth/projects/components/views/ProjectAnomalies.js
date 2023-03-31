import React, { useEffect, useState } from "react";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchProjectAnomalies } from "../../../../../services/projects/action";

const ProjectAnomalies = ({ component }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useSelector((state) => state.projects);

  useEffect(() => {
    // TrackingId: trackingIdFromList,
    dispatch(fetchProjectAnomalies({ projectId: projectId }, navigate));
  }, []);

  return (
    <OtherContentContainer>
      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default ProjectAnomalies;
