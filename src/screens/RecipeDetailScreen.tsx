import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RecipeDetailScreenRouteProp,
  RootStackNavigationProp,
} from "../navigation/types";
import { getMealDetailById } from "../api/endpoints";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const RecipeDetailScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { params } = useRoute<RecipeDetailScreenRouteProp>();
  const [recipeDetail, setRecipeDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    fetchRecipeDetail(params.idMeal);
  }, []);
  const fetchRecipeDetail = async (mealId: string) => {
    try {
      const response = await getMealDetailById({ mealId });
      // console.log(response.meals[0], " response.meals[0]");
      setRecipeDetail(response.meals[0]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const ingredientsIndexes = (recipe: any) => {
    if (!recipe) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <>
      {/* Back & Favourite Button */}
      <Animated.View
        entering={FadeIn.delay(100).duration(1000)}
        className="flex-row absolute w-full justify-between mt-14 px-6 z-30"
      >
        <TouchableOpacity
          className="bg-[#ffffffef] rounded-full p-2"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={hp(3.8)} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#ffffffef] rounded-full p-2"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <Ionicons
            name="heart"
            size={hp(3.8)}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Main Session */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <Animated.Image
          source={{ uri: params.imageMeal }}
          style={{ height: hp(50) }}
          sharedTransitionTag={params.strMeal}
        />
        {isLoading ? (
          <ActivityIndicator style={{ marginTop: hp(10) }} size="large" />
        ) : (
          <View className="px-4 pt-5 space-y-3 pb-3">
            {/* Recipe Title */}
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              className="space-y-2"
            >
              <Text
                style={{ fontSize: hp(3.8) }}
                className="font-bold flex-1 text-neutral-700"
              >
                {recipeDetail.strMeal}
              </Text>
              <Text
                style={{ fontSize: hp(2.2) }}
                className="font-medium flex-1 text-neutral-500"
              >
                {recipeDetail.strArea}
              </Text>
            </Animated.View>

            {/* MISC */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-around"
            >
              <View className="flex-row rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(4.5), width: hp(4.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={hp(3)}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center justify-center px-3">
                  <Text style={{ fontSize: hp(1.3), color: "#525252" }}>
                    Category
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="text-base font-medium"
                  >
                    {recipeDetail.strCategory}
                  </Text>
                </View>
              </View>
              <View className="flex-row rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(4.5), width: hp(4.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <MaterialCommunityIcons
                    name="tag-multiple"
                    size={hp(3)}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center justify-center px-3">
                  <Text style={{ fontSize: hp(1.3), color: "#525252" }}>
                    Tag
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="text-base font-medium"
                  >
                    {recipeDetail.strTags
                      ? recipeDetail.strTags.length > 15
                        ? recipeDetail.strTags.slice(0, 15) + "..."
                        : recipeDetail.strTags
                      : "-"}
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* INGREDIENTS */}
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-1 space-y-3 pt-3"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700 pb-1"
              >
                Ingredients
              </Text>
              <View className="space-y-2 ml-3">
                {ingredientsIndexes(recipeDetail).map((i) => {
                  return (
                    <View key={i} className="flex-row space-x-4">
                      <View
                        style={{ height: hp(1.5), width: hp(1.5) }}
                        className="bg-amber-300 rounded-full"
                      />
                      <View className="flex-row space-x-2">
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="font-extrabold text-neutral-600"
                        >
                          {recipeDetail["strMeasure" + i]}
                        </Text>
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="font-medium text-neutral-600"
                        >
                          {recipeDetail["strIngredient" + i]}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Animated.View>

            {/* INSTRUCTIONS */}
            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-1 space-y-3 pt-5"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Instructions
              </Text>
              <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                {recipeDetail.strInstructions}
              </Text>
            </Animated.View>

            {/*YOUTUBE VIDEO*/}
            {recipeDetail.strYoutube && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="pt-3"
              >
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold flex-1 text-neutral-700"
                >
                  Recipe Video
                </Text>
                <View className="pt-3">
                  <YouTubeIframe
                    videoId={getYoutubeVideoId(recipeDetail.strYoutube)!}
                    height={hp(30)}
                  />
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default RecipeDetailScreen;
