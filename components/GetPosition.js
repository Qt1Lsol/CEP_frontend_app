import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Button, Text, View } from "react-native";
import * as Location from "expo-location";

const GetPosition = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  console.log("GetPosition OK");

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      console.log("status==>", status);

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        console.log("coords==>", obj);

        setCoords(obj);
      } else {
        setError(true);
      }

      setIsLoading(false);
    };

    askPermission();

    return obj;
  }, []);
};

export default GetPosition;
