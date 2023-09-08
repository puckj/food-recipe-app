import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigation/types";

const WelcomeScreen = () => {
  const ringOutterPadding = useSharedValue(0);
  const ringInnerPadding = useSharedValue(0);
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    ringInnerPadding.value = 0;
    ringOutterPadding.value = 0;
    setTimeout(
      () =>
        (ringInnerPadding.value = withSpring(ringInnerPadding.value + hp(5))),
      100
    );
    setTimeout(
      () =>
        (ringOutterPadding.value = withSpring(
          ringOutterPadding.value + hp(5.5)
        )),
      300
    );
    setTimeout(() => navigation.navigate("HomeScreen"), 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ringOutterPadding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ringInnerPadding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold text-white tracking-widest"
        >
          Foody
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium text-white tracking-widest"
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
