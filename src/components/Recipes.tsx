import { View, Text, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import RecipeCard from "./RecipeCard";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

const Recipes = ({ recipes, isLoadingRecipes }: any) => {
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      {isLoadingRecipes === true ? (
        <ActivityIndicator style={{ paddingTop: hp(13) }} size="large" />
      ) : recipes !== null ? (
        <View>
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        </View>
      ) : (
        <Animated.View
          entering={FadeIn}
          className="flex justify-center items-center"
          style={{ paddingTop: hp(10) }}
        >
          <Ionicons name="md-sad-outline" size={hp(8)} color="#a2a2a2" />
          <Text className="text-[#a2a2a2] text-base">Receipt not found</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default Recipes;
