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
import axios from "axios";
import Interval from "../components/Interval";
// import GetQuestion from "../components/GetQuestion";

const AdventureScreen = (props) => {
  console.log("Adventure screen OK");

  console.log("Return coords adventure ==>", props.coords);
  console.log("Return token adventure ==>", props.userToken);

  const navigation = useNavigation();

  //compte a rebour
  useEffect(() => {
    // let count = 0;
    const getQuestionInterval = setInterval(() => {
      //requete qui va chercher la question

      try {
        const fetchData = async () => {
          console.log("Check filters for query=>", props.coords);
          console.log("Check token=>", props.userToken);

          const response = await axios.get(
            // `https://cepbackend.herokuapp.com/question/view?search=${search}`
            `http://localhost:4000/question/get?coords=${props.coords}`,

            {
              headers: {
                Authorization: "Bearer " + props.token,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setData(response.data);
          setIsLoading(false);
        };

        fetchData();
      } catch (error) {
        console.log(error.message);
      }
    }, 6);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <Text>Welcome to adventure screen</Text>
        <Interval />
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
