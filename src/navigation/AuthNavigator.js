import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreenG } from "../screens/auth/LoginScreenG";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreenG} />
    </Stack.Navigator>
  );
};
