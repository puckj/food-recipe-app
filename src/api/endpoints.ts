import { GET } from "./axios";

export const getCategories = async () => {
  return GET("/json/v1/1/categories.php");
};
