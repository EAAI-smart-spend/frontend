import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007AFF",
    secondary: "#5856D6",
    error: "#FF3B30",
    background: "#F2F2F7",
    surface: "#FFFFFF",
    onSurface: "#000000",
    onBackground: "#000000",
    text: "#000000",
    placeholder: "#8E8E93",
    disabled: "#C7C7CC",
    success: "#34C759",
    warning: "#FF9500",
  },
  fonts: {
    ...DefaultTheme.fonts,
    // iOS uses San Francisco font, closest web equivalent
    regular: {
      fontFamily: "System",
      fontWeight: "400" as const,
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500" as const,
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700" as const,
    },
  },
  roundness: 12,
};
