import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text>Email : </Text>
        <TextInput placeholder="email" />
        <Text>Mot de passe: </Text>
        <TextInput placeholder="mot de passe" secureTextEntry={true} />
        <Button
          title="Connexion"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Pas encore de compte ? Inscrit toi !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
