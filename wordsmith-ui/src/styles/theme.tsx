export const theme: ThemeType = {
  color: {
    primary: "#9FE8C5",
    secondary: "#9DA7CC",
    warning: "#F66464",
    disabled: "#7E7E7E",
    text: {
      dark: "#494949",
      light: "#E7E7E7",
    },
    background: {
      dark: "#273050",
      light: "#2A3457",
    },
    logoColor: "#E4E4E4",
    reverseButtonText: "#146D43",
    inputBoxBackground: "#E5E6EA",
    resultBoxBackground: "#E5E6EA",
    resultBoxBorder: "#CED0D9",
    lightCardBackground: "#2D375B",
    skeletonText: "#48537C",
    recentlyReversedHighlight: "#5C7CED",
    recentlyReversedIcon: "#B7B7B7",
  },
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "24px",
    6: "32px",
    7: "40px",
    8: "48px",
  },
  fontSize: {
    1: "12px",
    2: "14px",
    3: "18px",
    4: "24px",
    5: "36px",
    6: "48px",
  },
  inputBoxHeight: "150px",
  reverseButtonHeight: "60px",
  borderRadius: "5px",
};

export interface ThemeType {
  color: colorsType;
  spacing: SpacingsType;
  fontSize: FontSizeType;
  inputBoxHeight: string;
  reverseButtonHeight: string;
  borderRadius: string;
}

interface colorsType {
  primary: string;
  secondary: string;
  warning: string;
  disabled: string;
  background: {
    dark: string;
    light: string;
  };
  text: {
    dark: string;
    light: string;
  };
  logoColor: string;
  reverseButtonText: string;
  inputBoxBackground: string;
  resultBoxBackground: string;
  resultBoxBorder: string;
  lightCardBackground: string;
  skeletonText: string;
  recentlyReversedHighlight: string;
  recentlyReversedIcon: string;
}

interface SpacingsType {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
}

interface FontSizeType {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}
