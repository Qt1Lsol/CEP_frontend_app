import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Audio } from "expo-av";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Interval from "../components/Interval";
// import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const AdventureScreen = (props) => {
  console.log("Adventure screen OK");

  // console.log("Return coords adventure ==>", props.coords);
  console.log("Return latitude adventure ==>", props.coords.latitude);
  console.log("Return longitude adventure ==>", props.coords.longitude);
  console.log("Return token adventure ==>", props.userToken);

  const [questionRun, setQuestionRun] = useState(false);
  const [userAnswer, setUserAnswer] = useState("user answer");
  const [questionBlock, setQuestionBlock] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState();

  const [picture1, setPicture1] = useState("test");
  const [picture2, setPicture2] = useState("test");
  const [picture3, setPicture3] = useState("test");

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: questionBlock.questionNear[0].questionAudio.secure_url,
    });
    setSound(sound);

    console.log("Playing sound");
    await sound.playAsync();
  }

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

              randomNumber = getRandomInt(3);

              console.log("random num test=>", randomNumber);

              console.log(
                "picture1",
                questionBlock.questionNear[0].questionPicture.secure_url
              );
              console.log(
                "picture2",
                questionBlock.questionAlea[0].questionPicture.secure_url
              );
              console.log(
                "picture3",
                questionBlock.questionAlea[1].questionPicture.secure_url
              );

              if (randomNumber === 0) {
                //1xx
                setPicture1(
                  questionBlock.questionNear[0].questionPicture.secure_url
                );
                setPicture2(
                  questionBlock.questionAlea[0].questionPicture.secure_url
                );
                setPicture3(
                  questionBlock.questionAlea[1].questionPicture.secure_url
                );
              } else if (randomNumber === 1) {
                //x1x
                setPicture1(
                  questionBlock.questionAlea[0].questionPicture.secure_url
                );
                setPicture2(
                  questionBlock.questionNear[0].questionPicture.secure_url
                );
                setPicture3(
                  questionBlock.questionAlea[1].questionPicture.secure_url
                );
              } else {
                //xx1
                setPicture1(
                  questionBlock.questionAlea[0].questionPicture.secure_url
                );
                setPicture2(
                  questionBlock.questionAlea[1].questionPicture.secure_url
                );
                setPicture3(
                  questionBlock.questionNear[0].questionPicture.secure_url
                );
              }
              setIsLoading(false);
              setQuestionRun(true);
            } else {
              // on n'a pas de question
              setQuestionRun(false);
            }
          };

          fetchData();
        } catch (error) {
          console.log("catch=>", error.message);
          setQuestionRun(false);
        }
      } else {
      }
    }, 10000);

    // return () => {
    //   // Si vous ne le faites pas, vous générez une "fuite de mémoire"
    //   clearInterval(getQuestionInterval);
    // };
  }, []);

  return isLoading ? (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text>Bienvenue dans une nouvelle aventure</Text>

        <Text>En attente de la prochaine question</Text>
      </View>

      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text>Welcome to adventure screen</Text>
        <Interval />
        <Text>{props.coords.latitude}</Text>
        <Text>{props.coords.longitude}</Text>

        <Text>Picture1 : {picture1}</Text>
        <Text>Picture2 : {picture2}</Text>
        <Text>Picture3 : {picture2}</Text>

        <Text>{userAnswer}</Text>

        <Text>Welcome home!</Text>
        <MaterialIcons
          name="hearing"
          size={64}
          color="black"
          onPress={playSound}
        />
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
                uri: picture1,
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
                // uri: questionBlock.questionAlea[0].questionPicture.secure_url,
                uri: picture2,
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
                // uri: questionBlock.questionAlea[1].questionPicture.secure_url,
                uri: picture3,
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
