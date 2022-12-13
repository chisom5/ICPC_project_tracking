import { ThemeProvider } from "styled-components";
import { getTheme } from "./index";
import { useSelector } from "react-redux";

const DarkModeProvider = (props) => {
  const { mode } = useSelector((state) => state.theme);
  const value = getTheme(mode);
  return (
  <ThemeProvider theme={value} {...props} />);
};

export default DarkModeProvider;
