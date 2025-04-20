import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import styles from "./styles/styles";
import { loadAssets } from "./assets/load_assets";
import SignIn from "./pages/login_signup";
import HomeStackNavigator from "./navigation/home_stack_navigator";
import { UserContext } from "./models/UserContext";
import { User } from "./models/user";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(undefined);
  const assetsLoaded = loadAssets();
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]); //memorize computationally expensive values so that these values do not have to be recalculated on every render.
  if (!assetsLoaded) {
    return <AppLoading />;
  }

  const handleSignIn = (status, user_id) => {
    setUser(new User(user_id)); // This line instantiates a new User with the passed user_id
    setIsAuthenticated(status);
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <NavigationContainer>
        {isAuthenticated ? (
          <View style={styles.appContainer}>
            <HomeStackNavigator />
          </View>
        ) : (
          <SignIn onSignIn={handleSignIn} />
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
