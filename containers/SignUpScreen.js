import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignUpScreen({ setUserToken }) {
  console.log("SignUpScreen OK");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  //datepicker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // const navigate = useNavigate();

  const submitSignUp = async (event) => {
    console.log("birthdate==>", date);

    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/user/signup", {
        email: email,
        birthdate: date,
        password: password,
        confirmPassword: confirmPassword,
      });

      console.log(response);

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

        <Text>Date de naissance :</Text>

        <TextInput
          placeholder="date de naissance"
          onPressIn={showDatepicker}
          value={date.toDateString()}
          r
        />

        <View>
          {/* <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View> */}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

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
