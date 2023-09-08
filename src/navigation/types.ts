import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  WelcomeScreen: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
