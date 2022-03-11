import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  ImageBackground,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Interval from "../components/Interval";

const AdventureScreen = (props) => {
  console.log("Adventure screen OK");

  // console.log("Return coords adventure ==>", props.coords);
  console.log("Return latitude adventure ==>", props.coords.latitude);
  console.log("Return longitude adventure ==>", props.coords.longitude);
  console.log("Return token adventure ==>", props.userToken);

  const [questionRun, setQuestionRun] = useState(false);
  const [userAnswer, setUserAnswer] = useState("user answer");
  const [questionBlock, setQuestionBlock] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");

  // setLatitude(props.coords.latitude);
  // setLongitude(props.coords.longitude);

  const navigation = useNavigation();

  //compte a rebour
  useEffect(() => {
    // let count = 0;
    const getQuestionInterval = setInterval(() => {
      if (!questionRun) {
        //il n'y a as de question, il faut en rechercher une !

        try {
          //requete qui va chercher la question
          const fetchData = async () => {
            // console.log("Check filters for query=>", props.coords);
            console.log("Check token=>", props.userToken);
            console.log("Check lat=>", props.coords.latitude);
            console.log("Check long=>", props.coords.longitude);

            const response = await axios.post(
              // `https://cepbackend.herokuapp.com/question/view?search=${search}`
              // `http://localhost:4000/question/get?coords=${props.coords}`,
              `http://192.168.1.43:4000/question/get`,
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

            console.log(response.data);
            // vérifier data
            if (response.data) {
              //on a une question
              setQuestionBlock(response.data);
              setIsLoading(false);
              setQuestionRun(true);
              // console.log(
              //   "ALEA++++++++++URL==>",
              //   questionBlock.questionAlea[0].questionPicture.secure_url
              // );
            } else {
              // on n'a pas de question
              setQuestionRun(false);
            }
          };

          fetchData();
        } catch (error) {
          console.log(error.message);
          setQuestionRun(false);
        }
      } else {
      }
    }, 10000);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text>Welcome to adventure screen</Text>
        <Interval />
        <Text>{props.coords.latitude}</Text>
        <Text>{props.coords.longitude}</Text>

        <Text>{userAnswer}</Text>

        <Text>Welcome home!</Text>
        <Text style={styles.containerImg}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("image 1 clicked");
              setUserAnswer("1");
              setQuestionRun(false);
            }}
          >
            <Image
              source={{
                uri: "data.questionAlea[0].questionPicture.secure_url",
              }}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("image 2 clicked");
              setUserAnswer("2");
              setQuestionRun(false);
            }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2020/05/04/23/06/spring-5131048_960_720.jpg",
              }}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("image 3 clicked");
              setUserAnswer("3");
              setQuestionRun(false);
            }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2020/05/04/23/06/spring-5131048_960_720.jpg",
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default AdventureScreen;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "column",
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
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

  // cover: { height: 300, width: 200, marginTop: 100 },
  // logo: {
  //   height: 80,
  //   width: 80,
  // },
});
