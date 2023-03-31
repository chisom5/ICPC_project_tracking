const baseColors = {
  white: "#ffffff",
  gray: "#cccccc",
  gray2: '#666666',
  gray4: "#B2B2B2",
  grayShade: "#f6f6f6",
  mainBlue: "#237CBF",
  sidebarColor: "#30304A",
};

const blacks = {
  lightGrayScale: "#1C1C1C",
  black1: "#333333",
  mainBlack: "#000000",
  neuralDark: "#152738",
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
      danger: "#CC3366",
      primaryColor: "#30304A",
      secondaryDarkBlue: "#0C233C",
      secondaryGreen: "#00A3A1",
      secondaryLightGreen: "#C8FFD4",
      secondaryDarkGreen: "#3CB44B",
      secondaryPink: "#FD349C",
      tableHead: "#737D88",
      yellow: "#F9EB6D",
      unresolved: "#96250C",
      instructionNotice: "#A5A5B3",
      inputBgColor: "#EEEEEE",
      placeholderColor: "#A6ABAF",
      disabled: "#F7F7F7",
    },
  },
};

export default colors;
