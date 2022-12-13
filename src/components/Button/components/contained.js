import React from "react";
import { variant } from "styled-system";
import styled from "styled-components";
import { base } from "../../../styles/baseStyle";

const StyledButton = styled("button")(
  {
    fontSize: '16px',
    border: 0,
    outline: 0,
    width: "100%",
    fontFamily: "inherit",
    fontWeight: "700",
    cursor: "pointer",
    textTransform: "uppercase",

    "&:disabled": {
      opacity: 0.8,
      cursor: "not-allowed",
    },
    "&:hover": {
      boxShadow: "0 15px 15px rgba(0, 0, 0, 0.16)",
      transform: "translate(0, -3px)",
    },
  },
  variant({
    variants: {
      primary: {
        color: "primaryButtonText",
        bg: "primaryButtonBg",
      },
      secondary: {
        color: "secondaryButtonText",
        bg: "secondaryButtonBg",
      },
      ghost: {
        color: "primaryButtonText",
        bg: "transparent",
      },
      outline: {
        border: 1,
        color: "primaryButtonText",
        bg: "transparent",
        borderColor: "gray",
      },
    },
  }),
  base
);

StyledButton.defaultProps = {
  p: 2,
  height: 4,
  borderRadius: 3,
  display: "inline-block",
};

/**
 * Primary UI component for user interaction
 */
const ButtonContained = (props) => {
  return <StyledButton {...props} />;
};

export default ButtonContained;
