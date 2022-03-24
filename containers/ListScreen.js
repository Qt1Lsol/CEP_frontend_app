import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Dimensions } from "react-native";

import React, { useState, useEffect } from "react";

const ListScreen = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Check filters for query=>", props.coords);
        console.log("Check token=>", props.userToken);
        console.log("Check lat=>", props.coords.latitude);
        console.log("Check long=>", props.coords.longitude);

        const response = await axios.post(
          // `https://cepbackend.herokuapp.com/question/view?search=${search}`
          // `http://localhost:4000/question/get?coords=${props.coords}`,
          `http://192.168.1.43:4000/question/map`,
          {
            latitude: props.coords.latitude,
            longitude: props.coords.longitude,
          }

          // {
          //   headers: {
          //     Authorization: "Bearer " + props.userToken,
          //     "Content-Type": "multipart/form-data",
          //   },
          // }
        );

        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("catch1=>", error.message);
      }
    };
    fetchData();
  }, []); // fin du useeffect

  const array = [
    {
      key: "1",
      latitude: 190,
      longitude: 180,
    },
    {
      key: "2",
      latitude: 50,
      longitude: 50,
    },
    {
      key: "3",
      latitude: 0,
      longitude: 50,
    },

    {
      key: "4",
      latitude: -10,
      longitude: 80,
    },
  ];

  const list = () => {
    return array.map((element) => {
      return (
        <Text
          key={element.key}
          style={{
            position: "absolute",
            backgroundColor: "red",
            width: 20,
            height: 20,
            borderRadius: 90,
            top: height / 2 - 10 + element.latitude,
            left: width / 2 - 10 + element.longitude,
          }}
        >
          {element.key}
        </Text>
      );
    });
  };

  return isLoading ? (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text>Bienvenue dans la map</Text>

        <Text>En attente des points</Text>

        <Text>latitude:{props.coords.latitude}</Text>
        <Text>longitude:{props.coords.longitude}</Text>
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={{
          backgroundColor: "orange",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {list()}
        <Text
          style={{
            position: "absolute",
            backgroundColor: "pink",
            width: 20,
            height: 20,
            borderRadius: 90,
            top: height / 2 - 10,
            left: width / 2 - 10,
          }}
        >
          P0
        </Text>

        <Text style={styles.square}></Text>
        <Text style={styles.square}></Text>
        <Text style={styles.square}></Text>
        <Text style={styles.square}></Text>

        <Text>height:{height}</Text>
        <Text>width:{width}</Text>
      </View>
    </ImageBackground>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    backgroundColor: "violet",
    width: 100,
    height: 100,
  },

  pointOther: {
    position: "absolute",
    borderRadius: 90,
    width: 20,
    height: 20,
  },

  pointMe: {
    position: "absolute",
    borderRadius: 90,
    width: 20,
    height: 20,
  },

  containerImg: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
  },

  TouchableOpacity: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  image: {
    height: 100,
    width: 100,
    margin: 5,
    borderRadius: 10,
  },
});
