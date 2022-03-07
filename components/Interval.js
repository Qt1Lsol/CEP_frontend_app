import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Button, Text, View } from "react-native";
import * as Location from "expo-location";

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

const Interval = () => {
  const [seconds, setSeconds] = useState(0);
  const [countdown, setcountdown] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      setcountdown((countdown) => countdown - 1);

      if (countdown === 0) {
        //appeller la requeste question
      }
    }, 1000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {seconds_to_days_hours_mins_secs_str(countdown)} before the next
        question.
      </header>
    </div>
  );
};

export default Interval;
