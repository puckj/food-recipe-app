import { GET } from "./axios";

export const getCategories = async () => {
  return GET("/categories.php");
};

export const getFilterByMainIngredient = async (
  props: GetFilterByMainIngredientProps
) => {
  return GET(`/filter.php?i=${props.ingredientName}`);
};

export const getMealDetailById = async (props: GetMealDetailByIdProps) => {
  return GET(`/lookup.php?i=${props.mealId}`);
};
