import { View, ActivityIndicator, ActivityIndicatorProps } from "react-native";
import React from "react";

const LoadingIndicator = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<ActivityIndicator> &
    Readonly<ActivityIndicatorProps>
) => {
  return (
    <View>
      <ActivityIndicator {...props} />
    </View>
  );
};

export default LoadingIndicator;
