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
import GetPosition from "../components/GetPosition";

const AdventureScreen = () => {
  const navigation = useNavigation();
  //   const [coords, setCoords] = useState();

  console.log("Adventure screen OK");

  console.log("Return coords adventure ==>", coords);

  return (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <Text>Welcome to adventure screen</Text>
        <Interval />
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
