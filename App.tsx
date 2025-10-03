import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { appTheme } from "./constants/theme";
import { RootNavigator } from "./navigation";
import { store } from "./store/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={appTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
