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

const MapScreen = (props) => {
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
      title: "example title 1",
      subtitle: "example subtitle 1",
    },
    {
      key: "2",
      title: "example title 2",
      subtitle: "example subtitle 2",
    },
    {
      key: "3",
      title: "example title 3",
      subtitle: "example subtitle 3",
    },
  ];

  const list = () => {
    return array.map((element) => {
      return (
        <View key={element.key} style={{ margin: 10, backgroundColor: "red" }}>
          <Text>{element.title}</Text>
          <Text>{element.subtitle}</Text>
        </View>
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
      <View style={styles.container}>
        <Text>Bienvenue dans la map</Text>

        <FlatList
          style={{
            backgroundColor: "red",
            flex: 1,
          }}
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <View>
              <Text>latitude : {item.location.coordinates[1]}</Text>
              <Text>longitude : {item.location.coordinates[0]}</Text>

              <Text
                style={[
                  styles.pointOther,
                  {
                    backgroundColor: "violet",
                    top: 100,
                    left: 20,
                  },
                ]}
              >
                P0
              </Text>
            </View>
          )}
        />

        <Text
          style={[
            styles.pointMe,
            {
              backgroundColor: "pink",
            },
          ]}
        >
          P0
        </Text>

        <Text>P0 : </Text>
        <Text>P1 : </Text>

        <View>{list()}</View>
      </View>
    </ImageBackground>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
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
