import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  activeCategory: string;
  setActiveCategory: any;
};

const Categories = ({ activeCategory, setActiveCategory }: Props) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoryData.map((item, index) => {
          const isActive = item.name === activeCategory;
          const buttonClassName = isActive ? " bg-amber-400" : " bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              onPress={() => setActiveCategory(item.name)}
            >
              <View className={"rounded-full p-[6px]" + buttonClassName}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
