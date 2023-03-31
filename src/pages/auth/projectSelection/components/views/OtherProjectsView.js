import React, { useEffect } from "react";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";

import { fetchPetitionsByTrackingId } from "../../../../../services/projectSelection/action";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";

const OtherProjectsView = ({ component, currentPage }) => {
  const dispatch = useDispatch();

  const { trackingId } = useSelector((state) => state.global);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchPetitionsByTrackingId(
        { Id: trackingId, CurrentPage: currentPage, PageSize: 10 },
        navigate
      )
    );
  }, []);

  return (
    <OtherContentContainer>
      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default OtherProjectsView;
