import React from "react";
import Box from "./Box";
import styled from "styled-components";

const StyledBox = styled(Box)`
  display: flex;

  .container {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    left: 0;
    height: 24px;
    width: 24px;
    background-color: #fff;
    border: 2px solid #999999;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #fff;
    border: 2px solid #999999;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #f68d2e;
    border: none;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 8px;
    top: 4px;
    width: 7px;
    height: 11px;
    border: solid white;
    border-radius: 2px;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckBox = ({ checked, disabled, label, defaultChecked, ...props }) => {
  return (
    <StyledBox>
      <label className="container">
        {label && label}
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          {...props}
        ></input>
        <span className="checkmark"></span>
      </label>
    </StyledBox>
  );
};

export default CheckBox;
