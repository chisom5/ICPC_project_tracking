import { createGlobalStyle } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import "./fontStyle.css";

export const GlobalStyle = createGlobalStyle`

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    font-family: "OpenSans";
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: ${themeGet("colors.background", "#f6f6f6")};
    font-family: "OpenSans";
    margin: ${themeGet("space.0", "0px")};
    padding: ${themeGet("space.0", "0px")};
    box-sizing: border-box;
    height: 100%;
    overflow-x: hidden;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  ul {
    margin: ${themeGet("space.0", "0px")};
    padding: ${themeGet("space.0", "0px")};
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: ${themeGet("colors.accent")};

    &:hover {
      text-decoration: none;
      color: ${themeGet("colors.accent")};
      cursor: pointer;
    }
  }
  
  p{
    margin: 0px;
  }
 
  
    `;
