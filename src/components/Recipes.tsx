import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import RecipeCard from "./RecipeCard";
import LoadingIndicator from "./LoadingIndicator";

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
        <LoadingIndicator
          style={{paddingTop: hp(13)}}
          // className="bg-red-200"
          size="large"
        />
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
        <Text>
          <Text>No Recipes</Text>
        </Text>
      )}
    </View>
  );
};

export default Recipes;
