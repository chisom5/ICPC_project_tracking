import React, { useState } from "react";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProjectList } from "../../../../../services/projects/action";

const ProjectList = ({ component }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { trackingIdFromList } = useSelector((state) => state.projects);

  // const handlePagination = (pagination, filters, sorter) => {
  //   if (Object.keys(sorter).length !== 0) {
  //     // for sorting.
  //   } else if (Object.keys(filters).length !== 0) {
  //   } else {
  //     setCurrentPage(pagination.current);
  //     dispatch(
  //       fetchProjectList(
  //         {
  //           Id: trackingIdFromList,
  //           CurrentPage: pagination.current,
  //           PageSize: 10,
  //         },
  //         navigate
  //       )
  //     );
  //   }
  // };

  return (
    <OtherContentContainer>
      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default ProjectList;
