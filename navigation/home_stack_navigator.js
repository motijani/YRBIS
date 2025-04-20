import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "../pages/get_started";
import FindSearch from "../pages/find_search";
import Profile from "../pages/profile_view";
import YourBis from "../pages/your_bis";
import PostBis from "../pages/post_bis";
import UpdateForm from "../pages/update_form";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{
        transitionSpec: {
          open: { animation: "timing", config: { duration: 0 } },
          close: { animation: "timing", config: { duration: 0 } },
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="FindSearch" component={FindSearch} />
      <Stack.Screen name="YourBis" component={YourBis} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PostBis" component={PostBis} />
      <Stack.Screen name="UpdateForm" component={UpdateForm} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
