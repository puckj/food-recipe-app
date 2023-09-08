import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./types";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
    </Stack.Navigator>
  );
};

export default RootStack;
