import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import startInterval from "../containers/AdventureScreen";

// import UserLocation from "../components/UserLocation";

//icons
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ setIsCar, isCar, coords }) {
  console.log("HomeScreen OK");
  console.log("isCar=> ", isCar ? "true" : "false");
  console.log("coords=>", coords);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isCar
                ? "rgba(255, 0, 0, 0.8)"
                : "rgba(255, 0, 0, 0.1)",
            },
          ]}
          onPress={() => {
            setIsCar(true);
          }}
        >
          <FontAwesome name="car" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isCar
                ? "rgba(255, 0, 0, 0.1)"
                : "rgba(255, 0, 0, 0.8)",
            },
          ]}
          onPress={() => {
            setIsCar(false);
          }}
        >
          <FontAwesome5 name="walking" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text>Mode de transport : {isCar ? "Voiture" : "A pied"}</Text>
        <Text>coords : {coords ? coords.latitude : null}</Text>
        <Text>coords : {coords ? coords.longitude : null}</Text>
      </View>

      {/* <View style={styles.container}>
        <UserLocation />
      </View> */}

      <View style={styles.container}>
        <Button
          title="Nouvelle découverte"
          onPress={() => {
            navigation.navigate("Adventure", { userId: 123 });
          }}
        />

        <Button
          title="Cabinet de curiosité"
          onPress={() => {
            navigation.navigate("Curiosity", { userId: 123 });
          }}
        />

        <Button
          title="Map"
          onPress={() => {
            navigation.navigate("Map", { userId: 123 });
          }}
        />

        <Button
          title="List"
          onPress={() => {
            navigation.navigate("List", { userId: 123 });
          }}
        />

        <Button
          title="AdventureScreenDev"
          onPress={() => {
            navigation.navigate("AdventureScreenDev", { userId: 123 });
          }}
        />

        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },

  firstRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    height: 50,
  },

  button: {
    backgroundColor: "red",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
    width: 60,
    margin: 20,
  },
});
