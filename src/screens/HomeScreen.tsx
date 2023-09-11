import { View, ScrollView, Image, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Categories from "../components/Categories";
import { getCategories, getFilterByMainIngredient } from "../api/endpoints";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState(null);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchRecipes(activeCategory);
  }, [activeCategory]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      // console.log(response.categories, " response [Categories.tsx]");
      setCategories(response.categories);
    } catch (error) {
      console.error(error, "fetchCategories error! [Categories.tsx]");
    }
  };
  const fetchRecipes = async (categoryName: string) => {
    setIsLoadingRecipes(true);
    try {
      const response = await getFilterByMainIngredient({
        ingredientName: categoryName,
      });
      // console.log(response.meals, " fetchRecipes");
      setRecipes(response.meals);
    } catch (error) {
      console.error(error, "fetchRecipes error! [Categories.tsx]");
    }
    setIsLoadingRecipes(false);
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <Feather name="bell" size={hp(4)} color="gray" />
        </View>

        {/* greetings text */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Jay!
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Make your own food,
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.8) }}
            className="flex-1 py-1 px-3 tracking-wide"
          />
          <View className="bg-white rounded-full p-3">
            <Entypo name="magnifying-glass" size={hp(2.5)} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </View>
        {/* recipes */}
        <View>
          <Recipes recipes={recipes} isLoadingRecipes={isLoadingRecipes} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
