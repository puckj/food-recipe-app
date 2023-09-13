import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  RecipeDetailScreen: {
    idMeal: string;
    strMeal: string;
    imageMeal: string;
  };
};

export type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type RecipeDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "RecipeDetailScreen"
>;
