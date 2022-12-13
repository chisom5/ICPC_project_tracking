const baseColors = {
  white: "#ffffff",
  // black: "#000000",
  gray: "#cccccc",
  grayShade: "#f6f6f6",
mainBlue: '#237CBF',
  // green: "#009A44",
  // lightgray: "#757B86",
  // transparent: "transparent",
  // blue: "#00338D",
  // lighBlue: "#0091DA",
};

const blacks = {
  lightGrayScale: "#1C1C1C",
  black1: "#333333",
  mainBlack: '#000000'
};

const common = {
  success: "#17960C",
  error: "#D9534F",
  warning: "#F0AD4E",
  info: "#3C557E",
  inactiveField: "#f2f2f2",
  inactiveButton: "#b7dbdd",
  inactiveIcon: "#EBEBEB",
};

const colors = {
  modes: {
    light: {
      ...baseColors,
      ...common,
      ...blacks,
      text: "#293241",
      background: "#fff",
      formHeader: "#152738",
      formsubHeaderBlack: "#272E33",
      danger: '#CC3366',
      // primary: "#00338D",
      // secondary: "#293241",
      // tertiary: "#F68D2E",
      // primaryButtonBg: "#005EB8",
      // primaryButtonText: "#FFFFFF",
      // menuTextColor: "#42526E",
      // tertiaryPink: "#C6007E",
      // successBg: "#E6F5ED",
      // labelColor: "#002E5A",
      // selectBox: "#DFE1E5",
      // inputBg: "#FFFFFF",
      // inputColor: "#002E5A",
      // placeholderColor: "#838D9D",
      // borderColor: "#D2D7DB",
      // accent: "#B50156",
      // focusStyleBg: "#EDF0F3",
      // focusStyleBorderColor: "#002E5A",
      disabled: "#F7F7F7",
    },
  },
};

export default colors;
