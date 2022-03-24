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

//icon
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { render } from "react-dom";
import GoToUrl from "../components/GoToUrl";

const AdventureScreenDev = (props) => {
  const navigation = useNavigation();

  console.log("Adventure screen OK");
  console.log("Return latitude adventure ==>", props.coords.latitude);
  console.log("Return longitude adventure ==>", props.coords.longitude);
  console.log("Return token adventure ==>", props.userToken);

  //state
  const [questionRun, setQuestionRun] = useState(false);
  const [questionBlock, setQuestionBlock] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState([]);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isGoodAnswer, setIsGoodAnswer] = useState([]);
  const [goodAnswerNum, setGoodAnswerNum] = useState(null);
  const [isUserAnswerGood, setIsUserAnswerGood] = useState(null);
  const [sound, setSound] = useState();

  const stopInterval = () => {
    clearInterval(intervalId);
    console.log("Terminé");
  };

  const startQuery = () => {
    setIsAnswerVisible(false);
    fetchData();
  };

  const startInterval = () => {
    console.log("Go");
    intervalId = setInterval(startQuery, 5000);
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: questionBlock.questionNear[0].questionAudio.secure_url,
    });
    setSound(sound);

    console.log("Playing sound");
    await sound.playAsync();
  }

  useEffect(() => {
    startInterval();
  }, []); // fin du useeffect

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const fetchData = async () => {
    try {
      // console.log("Check filters for query=>", props.coords);
      console.log("Check token=>", props.userToken);
      console.log("Check lat=>", props.coords.latitude);
      console.log("Check long=>", props.coords.longitude);

      const response = await axios.post(
        `http://192.168.1.43:4000/question/get`,
        {
          latitude: props.coords.latitude,
          longitude: props.coords.longitude,
        }
      );

      if (response.data) {
        // console.log(response.data);

        randomQuestion(response.data);
        setIsLoading(false);

        stopInterval();
      }
    } catch (error) {
      console.log("catch1=>", error.message);
    }
  };

  const randomQuestion = (data) => {
    let randomNumber = getRandomInt(3);
    setGoodAnswerNum(randomNumber);
    console.log("random OK=>", randomNumber);
    setQuestionBlock(data);

    if (randomNumber === 0) {
      //1xx
      setPicture([
        data.questionNear[0].questionPicture.secure_url,
        data.questionAlea[0].questionPicture.secure_url,
        data.questionAlea[1].questionPicture.secure_url,
      ]);
      setIsGoodAnswer([true, false, false]);
    } else if (randomNumber === 1) {
      //x1x
      setPicture([
        data.questionAlea[0].questionPicture.secure_url,
        data.questionNear[0].questionPicture.secure_url,
        data.questionAlea[1].questionPicture.secure_url,
      ]);

      setIsGoodAnswer([false, true, false]);
    } else {
      //xx1
      setPicture([
        data.questionAlea[0].questionPicture.secure_url,
        data.questionAlea[1].questionPicture.secure_url,
        data.questionNear[0].questionPicture.secure_url,
      ]);
      setIsGoodAnswer([false, false, true]);
    }
  };

  const handelAnswer = (userAnswer) => {
    //rendre les réponse visible
    if (isAnswerVisible) {
      setIsAnswerVisible(false);
    } else {
      setIsAnswerVisible(true);
    }

    //vérifier la réponse utilisateur vs good answer
    if (userAnswer === goodAnswerNum) {
      //l'utilisateur à la bonne réponse
      setIsUserAnswerGood(true);
    } else {
      //l'utilisateur n'a pas la bonne réponse
      setIsUserAnswerGood(false);
    }
  };

  return isLoading ? (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.containerTrue}>
        <Text>Bienvenue dans une nouvelle aventure</Text>

        <Text>En attente de la prochaine question</Text>

        <Text>latitude:{props.coords.latitude}</Text>
        <Text>longitude:{props.coords.longitude}</Text>
        <Text>isLoading : {isLoading ? "True" : "False"}</Text>
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../assets/adaptive-icon.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={[styles.container]}>
        <Text style={{ fontSize: 18 }}>Welcome to adventure screen</Text>
      </View>

      <Text>_________DEVELOPPEUR_____________________</Text>
      <Text>isAnswerVisible : {isAnswerVisible ? "true" : "false"}</Text>
      <Text>goodAnswerNum : {goodAnswerNum} (start at 0)</Text>
      <Text>isLoading : {isLoading ? "true" : "false"}</Text>
      <Text>_________DEVELOPPEUR_____________________</Text>

      <View
        style={[
          styles.container,
          {
            display: isAnswerVisible ? "flex" : "none",
          },
        ]}
      >
        <Text style={{ fontSize: 14 }}>
          {isUserAnswerGood ? "BRAVO !  " : "DOMMAGE !  "}
        </Text>

        <Entypo
          name={isUserAnswerGood ? "emoji-flirt" : "emoji-sad"}
          size={48}
          color={isUserAnswerGood ? "green" : "red"}
        />
      </View>

      <MaterialIcons
        name="hearing"
        size={64}
        color="black"
        onPress={playSound}
      />

      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() => {
            handelAnswer(0);
          }}
        >
          <Image
            source={{
              uri: picture[0],
            }}
            style={styles.image}
            //   onLoadStart={() => setLoadingPicture1(true)}
            //   onLoadEnd={() => setLoadingPicture1(false)}
          />

          <AntDesign
            name={isGoodAnswer[0] ? "checkcircle" : "closecircle"}
            size={24}
            color={isGoodAnswer[0] ? "green" : "red"}
            style={{
              height: isAnswerVisible ? "auto" : 0,
              width: isAnswerVisible ? "auto" : 0,
              position: "absolute",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handelAnswer(1);
          }}
        >
          <Image
            source={{
              uri: picture[1],
            }}
            style={styles.image}
          />

          <AntDesign
            name={isGoodAnswer[1] ? "checkcircle" : "closecircle"}
            size={24}
            color={isGoodAnswer[1] ? "green" : "red"}
            style={{
              height: isAnswerVisible ? "auto" : 0,
              width: isAnswerVisible ? "auto" : 0,
              position: "absolute",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handelAnswer(2);
          }}
        >
          <Image
            source={{
              uri: picture[2],
            }}
            style={styles.image}
          />

          <AntDesign
            name={isGoodAnswer[2] ? "checkcircle" : "closecircle"}
            size={24}
            color={isGoodAnswer[2] ? "green" : "red"}
            backgroundColor="#EE3B39"
            style={{
              height: isAnswerVisible ? "auto" : 0,
              width: isAnswerVisible ? "auto" : 0,
              position: "absolute",
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.container,
          {
            display: isAnswerVisible ? "flex" : "none",
          },
        ]}
      >
        <Text style={{ fontSize: 14 }}>
          {questionBlock.questionNear[0].questionPicture.secure_url}
          {isUserAnswerGood ? "BRAVO !  " : "DOMMAGE !  "}
        </Text>
        <GoToUrl />
        <Entypo
          name={isUserAnswerGood ? "emoji-flirt" : "emoji-sad"}
          size={48}
          color={isUserAnswerGood ? "green" : "red"}
        />
      </View>

      <View style={[styles.container]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              display: isAnswerVisible ? "flex" : "none",
            },
          ]}
          onPress={() => {
            setIsLoading(true);
            startInterval();
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Prochaine question
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AdventureScreenDev;

const styles = StyleSheet.create({
  containerTrue: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
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

  image: {
    height: 100,
    width: 100,
    margin: 5,
    borderRadius: 10,
  },

  button: {
    margin: 20,
    backgroundColor: "blue",
    height: 50,
    width: 200,
    color: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
