import React, { useState, useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import styles from "../styles/styles";
import InputLabel from "../components/input_label";
import BottomBarNavigation from "../navigation/bottom_bar";
import PageTitle from "../components/page_title";
import LinearGradientWrapper from "../components/linear_gradient_wrapper";
import Button from "../components/main_button";
import * as Location from "expo-location";
import CustomDropdown from "../components/custom_dropdown";
import { generate_tags, moderate_requests } from "../services/openai-service";
import { post_business } from "../services/dynamo-service";
import { UserContext } from "../models/UserContext";
import { g_fetchAddress, g_fetchCoords } from "../services/google-service";

const UpdateForm = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const bis = user.getBisbyViewId()._j[0];
  const [bisName, setBisName] = useState(bis.title);
  const [bisDescription, setBisDescription] = useState(bis.description);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState(bis.address);
  const [getLocation, setGetLocation] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [distanceValue, setDistanceValue] = useState(bis.maxDistance);
  const [tags, setTags] = useState(bis.tags);
  const [pricing, setPricing] = useState(bis.pricing);
  const [status, setStatus] = useState(bis.status);

  const distanceOptions = [
    { label: "5 Miles", value: "5 Miles" },
    { label: "10 Miles", value: "10 Miles" },
    { label: "25 Miles", value: "25 Miles" },
    { label: "50 Miles", value: "50 Miles" },
    { label: "Remote", value: "Remote" },
  ];
  const pricingOptions = [
    { label: "Flexible", value: "Flexible" },
    { label: "Strict", value: "Strict" },
    { label: "Hourly", value: "Hourly" },
    { label: "Per Request", value: "Per Request" },
  ];

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Pause", value: "Paused" },
  ];

  const getAiTags = async () => {
    const open_ai = await generate_tags(
      await user.getId(),
      bisName,
      bisDescription,
      pricing
    );
    if (!open_ai.status) {
      Alert.alert(open_ai.message);
      return;
    }
    setTags(open_ai.message);
  };

  useEffect(() => {
    const fetchCoords = async () => {
      const ret = await g_fetchCoords(address);
      console.log("returned location", ret);
      setLocation({ latitude: ret.latitude, longitude: ret.longitude });
    };
    fetchCoords();
  }, []);

  const requestLocationPermission = async () => {
    setAddress("Getting location...");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      setGetLocation(false);
      setGettingLocation(false);
      setAddress("");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    await fetchAddress(location.coords.latitude, location.coords.longitude);
  };

  const fetchAddress = async (latitude, longitude) => {
    const google_api = await g_fetchAddress(latitude, longitude);
    setGettingLocation(false);
    if (!google_api.status) {
      Alert.alert(google_api.message);
      return;
    }
    setAddress(google_api.message);
  };

  const handleAddressFocus = () => {
    if (!address && getLocation && !gettingLocation) {
      setGettingLocation(true);
      requestLocationPermission();
    }
  };

  const handleDeleteBis = async () => {
    const business_id = await post_business(
      user.getId(),
      bisName,
      bisDescription,
      location.latitude + "," + location.longitude,
      distanceValue,
      pricing,
      tags,
      bis.datePosted,
      "Deleted",
      address,
      true,
      bis.business_id
    );

    const newBis = {
      acc_id: await user.getId(),
      business_id: business_id,
      title: bisName,
      datePosted: new Date().toISOString(),
      description: bisDescription,
      location: location.latitude + "," + location.longitude,
      maxDistance: distanceValue,
      pricing: pricing,
      status: "Deleted",
      tags: tags,
      address: address,
    };
    await user.updateBis(newBis); // Call updateBis on the user object
    await user.changeBisViewId(-1);
    Alert.alert("Business deleted successfully!");
    navigation.navigate("YourBis");
  };

  const handleUpdateBis = async () => {
    if (!user) {
      Alert.alert("User is not available");
      return;
    }

    const message_flagged = await moderate_requests(
      "${bisName}, ${bisDescription}"
    );
    if (message_flagged) {
      Alert.alert("Business is not appropriate to be posted");
      return;
    }
    if (bisDescription.length < 30) {
      Alert.alert("Please input more details about your business");
      return;
    }

    if (!location) {
      Alert.alert("Location is needed in order to post business");
      return;
    }
    if (distanceValue === "") {
      Alert.alert("Please select a distance option");
      return;
    }
    if (pricing === "") {
      Alert.alert("Please select a pricing option");
      return;
    }

    try {
      const business_id = await post_business(
        user.getId(),
        bisName,
        bisDescription,
        location.latitude + "," + location.longitude,
        distanceValue,
        pricing,
        tags,
        bis.datePosted,
        status,
        address,
        true,
        bis.business_id
      );

      const newBis = {
        acc_id: await user.getId(),
        business_id: business_id,
        title: bisName,
        datePosted: new Date().toISOString(),
        description: bisDescription,
        location: location.latitude + "," + location.longitude,
        maxDistance: distanceValue,
        pricing: pricing,
        status: "Active",
        tags: tags,
        status: status,
      };

      //update user class instance, to avoid making another db call
      await user.updateBis(newBis); // Call updateBis on the user object
      await user.changeBisViewId(-1);

      Alert.alert("Business posted successfully!");
      navigation.navigate("YourBis");
    } catch (error) {
      console.error("Error posting business:", error);
      Alert.alert("An error occurred while posting the business");
    }
  };

  return (
    <LinearGradientWrapper
      startColor="#2e4057"
      endColor="#dbcbd8"
      style={{ flex: 1 }}
    >
      <PageTitle page_title={"Post Bis"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.post_bis_form_container}
          keyboardShouldPersistTaps="handled"
        >
          <InputLabel
            containerStyle={{
              width: "90%",
              height: 50,
              paddingTop: 0,
            }}
            style={[
              styles.generic_input_container,
              { width: "100%", height: 50 },
            ]}
            placeholder={"Enter Bis name"}
            value={bisName}
            maxLength={20}
            showLength={true}
            onChangeText={setBisName}
          />
          <InputLabel
            containerStyle={{
              width: "90%",
              height: 200,
            }}
            style={[
              styles.generic_input_container,
              {
                width: "100%",
                height: 200,
                paddingLeft: 8,
                paddingRight: 8,
              },
            ]}
            placeholder={"Enter short description of service"}
            value={bisDescription}
            maxLength={250}
            showLength={true}
            onChangeText={setBisDescription}
            multiline={true}
          />
          <InputLabel
            containerStyle={{
              width: "90%",
              height: 50,
            }}
            style={[
              styles.generic_input_container,
              { width: "100%", height: 50 },
            ]}
            placeholder={"Enter address"}
            value={address}
            onFocus={handleAddressFocus}
            onChangeText={() => (gettingLocation ? null : setAddress())}
          />
          <CustomDropdown
            title={"Select Distance"}
            label="Select Max Distance"
            value={distanceValue}
            options={distanceOptions}
            onSelect={setDistanceValue}
            multiple={false}
          />
          <CustomDropdown
            title="Pricing"
            label="Select Pricing"
            value={pricing}
            options={pricingOptions}
            onSelect={setPricing}
            multiple={true}
          />
          <InputLabel
            containerStyle={{
              width: "90%",
              height: 70,
            }}
            style={[
              styles.generic_input_container,
              { width: "100%", height: 90 },
            ]}
            placeholder={"Tags"}
            value={tags}
            maxLength={80}
            showLength={true}
            multiline={false}
            onFocus={getAiTags}
            onChangeText={setTags}
          />
          <CustomDropdown
            title={"Listing Status"}
            label="Select Listing Status"
            value={status}
            options={statusOptions}
            onSelect={setStatus}
            multiple={false}
          />
          <Button
            text={"Update Bis"}
            additionalButtonStyle={styles.submit_btn_container}
            onPress={handleUpdateBis}
          />
          <Button
            text={"Delete Bis"}
            additionalButtonStyle={styles.submit_btn_container}
            onPress={handleDeleteBis}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomBarNavigation />
    </LinearGradientWrapper>
  );
};

export default UpdateForm;
