import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Button, Text, View } from "react-native";
import * as Location from "expo-location";
import TimeFormat from "./TimeFormat";

const Interval = () => {
  const [compteur, setCompteur] = useState();

  useEffect(() => {
    let countdown = 6;

    const interval = setInterval(() => {
      countdown--;
      setCompteur(countdown);

      if (countdown === -1) {
        countdown = 6;
        setCompteur(countdown);
      }
    }, 1000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {TimeFormat(compteur)} before the next question.
      </header>
    </div>
  );
};

export default Interval;
