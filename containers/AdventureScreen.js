import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  ImageBackground,
  Button,
  Text,
  View,
  Image,
} from "react-native";

import React, { useState, useEffect } from "react";
import Interval from "../components/Interval";

function seconds_to_days_hours_mins_secs_str(seconds) {
  //day, h, m and s
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return (
    (0 < days ? days + " day, " : "") + hours + ":" + minutes + ":" + seconds
  );
}

const AdventureScreen = (props) => {
  const navigation = useNavigation();
  //   const [coords, setCoords] = useState();

  console.log("Adventure screen OK");

  console.log("Return coords adventure ==>", props.coords);

  return (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <Text>Welcome to adventure screen</Text>
        {/* <Interval /> */}
        <Text>{seconds_to_days_hours_mins_secs_str(props.seconds)}</Text>
        <Text>{props.coords.latitude}</Text>
        <Text>{props.coords.longitude}</Text>
        {/* <Image
        source={require("../assets/adaptive-icon.png")}
        style={styles.cover}
        resizeMode="contain"
      /> */}
        {/* {/* <Button
        title="Nouvelle découverte"
        onPress={() => {
          navigation.navigate("Adventure", { userId: 123 });
        }}
      /> */}
        <Text>Welcome home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />{" "}
      </View>
    </ImageBackground>
  );
};

export default AdventureScreen;

const styles = StyleSheet.create({
  cover: { height: 300, width: 200, marginTop: 100 },
  logo: {
    height: 80,
    width: 80,
  },
});
