import React from "react";
import { View, Text, Image } from "react-native";
import Svg, { Line } from "react-native-svg";
import styles from "../styles/styles";
import Colors from "../styles/colors";
import SeparatorLine from "./seperation_line";

const ProfileStats = ({ userData }) => (
  <View style={styles.profile_view_stats}>
    <Text style={styles.full_name_text}>{userData.fullname}</Text>
    <View style={styles.pfp_name_rating_line}>
      <SeparatorLine height={10} width={180} x1={0} y1={0} x2={180} y2={0} />
    </View>
    <View style={styles.ratings_container}>
      <Text style={styles.ratings_text}>{userData.stars}</Text>
      <Image
        source={require("../assets/icons/star_icon.png")} // Adjust the path to your star image
        style={styles.star_image}
      />
      <Text style={styles.ratings_text}>
        {" (" + userData.review_count + " Reviews)"}
      </Text>
    </View>
  </View>
);

export default ProfileStats;
