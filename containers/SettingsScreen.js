import React, { useState } from "react";
import { Button, Text, View, TextInput } from "react-native";

export default function SettingsScreen({ setToken }) {
  const [questionInterval, setQuestionInterval] = useState("");

  return (
    <View>
      <Text>Hello Settings</Text>

      <Text>Obtenir une question toutes les </Text>
      <TextInput
        placeholder="nombre compris entre 1 et 59"
        keyboardType="numeric"
        style={{ height: 44, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => {
          setQuestionInterval(text);
        }}
        value={questionInterval}
      />
      <Text>minute(s)</Text>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
