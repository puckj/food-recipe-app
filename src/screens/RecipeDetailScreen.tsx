import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { RecipeDetailScreenRouteProp } from "../navigation/types";
import { getMealDetailById } from "../api/endpoints";

const RecipeDetailScreen = () => {
  const { params } = useRoute<RecipeDetailScreenRouteProp>();
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   console.log(params, " params => [RecipeDetailScreen]");
  useEffect(() => {
    fetchRecipeDetail(params.idMeal);
  }, []);
  const fetchRecipeDetail = async (mealId: string) => {
    try {
      const response = await getMealDetailById({ mealId });
      console.log(response.meals[0], " response.meals[0]");
      setRecipeDetail(response.meals[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>RecipeDetailScreen</Text>
    </View>
  );
};

export default RecipeDetailScreen;
