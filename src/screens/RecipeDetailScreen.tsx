import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RecipeDetailScreenRouteProp,
  RootStackNavigationProp,
} from "../navigation/types";
import { getMealDetailById } from "../api/endpoints";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import OverlayActivityIndicator from "../components/OverlayActivityIndicator";
import { AntDesign } from "@expo/vector-icons";

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
      console.log(response.meals[0], " response.meals[0]");
      setRecipeDetail(response.meals[0]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <View className="flex-row absolute w-full justify-between mt-14 px-6 z-30">
        <TouchableOpacity
          className="bg-[#ffffffe5] rounded-full p-2"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={hp(3.8)} color="#fbbf24" />
        </TouchableOpacity>
        {!isLoading && (
          <TouchableOpacity
            className="bg-[#ffffffe5] rounded-full p-2"
            onPress={() => setIsFavourite(!isFavourite)}
          >
            <Ionicons
              name="heart"
              size={hp(3.8)}
              color={isFavourite ? "red" : "gray"}
            />
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <OverlayActivityIndicator visible={true} />
      ) : (
        <ScrollView>
          <Image
            source={{ uri: recipeDetail.strMealThumb }}
            style={{ height: hp(50) }}
          />
          <View className="px-4 space-y-2 pt-8">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipeDetail.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipeDetail.strArea}
            </Text>
          </View>

          {/* misc */}
          {/* <View className="flex-row justify-around">
            <View className="">
              <View className="bg-white">
                <AntDesign name="clockcircleo" size={24} color="black" />
              </View>
              <View>
                <Text></Text>
                <Text></Text>
              </View>
            </View>
            <View>
              <View className="bg-white">
                <Ionicons name="people" size={24} color="black" />
              </View>
              <View>
                <Text></Text>
                <Text></Text>
              </View>
            </View>
          </View> */}
        </ScrollView>
      )}
    </>
  );
};

export default RecipeDetailScreen;
