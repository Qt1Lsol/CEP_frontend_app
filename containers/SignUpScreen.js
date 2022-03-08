import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import DatePickerApp from "../components/DatePicker";
// import { useNavigate } from "react-router-dom";

export default function SignUpScreen({ setUserToken }) {
  console.log("SignUpScreen OK");

  const [email, setEmail] = useState("");
  // const [date, setDate] = useState("09-10-2021");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // const navigate = useNavigate();

  const submitSignUp = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:4000/question/user/signup",
        {
          email: email,
          birthdate: birthdate,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      if (response.data.token) {
        setUserToken(response.data.token);
        // navigate("/question");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
      console.log(error.message);
    }
  };

  return (
    <View>
      <View>
        <Text>Email : </Text>
        <TextInput
          placeholder="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <DatePickerApp />

        <Text>Mot de passe : </Text>
        <TextInput
          placeholder="mot de passe"
          secureTextEntry={true}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Text>Confirmer le mot de passe : </Text>
        <TextInput
          placeholder="confirmer le mot de passe"
          secureTextEntry={true}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />

        <Button
          title="S'inscrire"
          onPress={async () => {
            submitSignUp();
          }}
        />
      </View>
    </View>
  );
}
