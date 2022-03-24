import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import AdventureScreen from "./containers/AdventureScreen";
import AdventureScreenDev from "./containers/AdventureScreenDev";
import MapScreen from "./containers/MapScreen";
import ListScreen from "./containers/ListScreen";
import CuriosityScreen from "./containers/CuriosityScreen";
import SplashScreen from "./containers/SplashScreen";
// import GetPosition from "./components/GetPosition";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
// import * as TaskManager from "expo-task-manager";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const LOCATION_TRACKING = "location-tracking";

export default function App() {
  console.log("app.js OK");

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [countdown, setCountdown] = useState(6);
  const [coords, setCoords] = useState();
  // const [askCoords, setAskCoords] = useState("");

  const [isCar, setIsCar] = useState(true);

  //localisation

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  //récupérer la position du téléphone.........................................................

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status=>", status);

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setInterval(async () => {
        // setIsLoading(true);
        let location = await Location.getCurrentPositionAsync({});
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
        // console.log(coords.latitude);
        // setIsLoading(false);
      }, 10000);
    })();
  }, []);

  //..........................................................................................

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen
              name="SignIn"
              options={{
                title: "Connexion",
              }}
            >
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{
                title: "Inscription",
              }}
            >
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "Culture en Poche",
                          headerStyle: { backgroundColor: "red" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => (
                          <HomeScreen
                            setIsCar={setIsCar}
                            isCar={isCar}
                            coords={coords}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Adventure"
                        options={{
                          title: "Adventure",
                        }}
                      >
                        {() => (
                          <AdventureScreen
                            isCar={isCar}
                            userToken={userToken}
                            coords={coords}
                            seconds={seconds}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="AdventureScreenDev"
                        options={{
                          title: "AdventureScreenDev",
                        }}
                      >
                        {() => (
                          <AdventureScreenDev
                            isCar={isCar}
                            userToken={userToken}
                            coords={coords}
                            seconds={seconds}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Map"
                        options={{
                          title: "Map",
                        }}
                      >
                        {() => (
                          <MapScreen
                            userToken={userToken}
                            coords={coords}
                            seconds={seconds}
                            isCar={isCar}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="List"
                        options={{
                          title: "List",
                        }}
                      >
                        {() => (
                          <ListScreen
                            userToken={userToken}
                            coords={coords}
                            seconds={seconds}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Curiosity"
                        options={{
                          title: "Curiosity",
                        }}
                      >
                        {() => <CuriosityScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
