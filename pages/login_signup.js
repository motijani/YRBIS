import React, { useState } from "react";
import {
  Text,
  Button,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import InputLabel from "../components/input_label";
import styles from "../styles/styles"; // Import the styles from styles.js
import { validateLogin, createUser } from "../services/dynamo-service";

const AuthScreen = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async () => {
    try {
      const isAuthenticated = await validateLogin(email, password);
      if (isAuthenticated.success == true) {
        onSignIn(true, isAuthenticated.user_id);
      } else {
        Alert.alert(isAuthenticated.message);
      }
    } catch (error) {
      console.error("Critical Error on Sign In", error);
      Alert.alert("An error occurred during sign-in.");
    }
  };

  const handleSignUp = async () => {
    //Check if password matches password making practices
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    try {
      const userCreated = await createUser(
        username,
        email,
        password,
        firstname + " " + lastname
      );
      if (userCreated.success == true) {
        onSignIn(true, userCreated.user_id);
      } else {
        Alert.alert(userCreated.message);
      }
    } catch (error) {
      console.error("Critical Error on Sign In", error);
      Alert.alert("An error occurred during sign-up.");
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp((prevMode) => !prevMode);
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
          {isSignUp && (
            <InputLabel
              customContainer={styles.signInInputContainer}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.signInInput}
            />
          )}
          {isSignUp && (
            <InputLabel
              customContainer={styles.signInInputContainer}
              placeholder="First Name"
              value={firstname}
              onChangeText={setFirstName}
              style={styles.signInInput}
            />
          )}
          {isSignUp && (
            <InputLabel
              customContainer={styles.signInInputContainer}
              placeholder="Last Name"
              value={lastname}
              onChangeText={setLastName}
              style={styles.signInInput}
            />
          )}
          <InputLabel
            customContainer={styles.signInInputContainer}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.signInInput}
          />
          <InputLabel
            customContainer={styles.signInInputContainer}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.signInInput}
            secureTextEntry
          />
          {isSignUp && (
            <InputLabel
              customContainer={styles.signInInputContainer}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.signInInput}
              secureTextEntry
            />
          )}
          <Button
            title={isSignUp ? "Sign Up" : "Sign In"}
            onPress={isSignUp ? handleSignUp : handleSignIn}
          />
          <Button
            title={isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
            onPress={toggleAuthMode}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
