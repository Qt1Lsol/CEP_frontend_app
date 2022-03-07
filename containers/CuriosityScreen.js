import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Button, Text, View } from "react-native";
import * as Location from "expo-location";

export default function CuriosityScreen() {
  //   const navigation = useNavigation();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      } else {
        setError(true);
      }

      setIsLoading(false);
    };

    askPermission();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : error ? (
        <Text>Permission refusée</Text>
      ) : (
        <>
          <Text>Latitude de l'utilisateur : {coords.latitude}</Text>
          <Text>Longitude de l'utilisateur : {coords.longitude}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
