import React, { useState } from "react";
import { MainContent, MiniHeaderStyle, Content } from "../../../styles/layout";
import { Text, Img, Box } from "../../../components/Primitives";
import styled from "styled-components";
// import colors from "../../theme/colors";

const Budgetupload = () => {
  return (
    <MainContent>
      <MiniHeaderStyle>
        <p className="title">Budget / Project File Upload</p>
      </MiniHeaderStyle>
      <Content></Content>
    </MainContent>
  );
};

export default Budgetupload;
