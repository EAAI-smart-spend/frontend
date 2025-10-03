import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { OnboardingScreen } from "../screens";
import { TabNavigator } from "./TabNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};
