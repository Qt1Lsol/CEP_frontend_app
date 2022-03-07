import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Culture En Poche</Text>
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

      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
