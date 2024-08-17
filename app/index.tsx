import { StatusBar } from "expo-status-bar";
import { Redirect, router, Stack } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "./../components/CustomButton";
import Loader from "./../components/Loader";
import { isLoaded } from "expo-font";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

// import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
  // const { loading, isLogged } = useGlobalContext();
  const loading = false;
  const isLogged = false;

  if (!loading && isLogged) return <Redirect href="/home" />;
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(true);

  // useEffect(async () => {
  //   const appData = await AsyncStorage.getItem('isAppFirstLaunched');
  //   if (appData == null) {
  //     setIsAppFirstLaunched(true);
  //     AsyncStorage.setItem('isAppFirstLaunched', 'false');
  //   } else {
  //     setIsAppFirstLaunched(false);
  //   }

    // AsyncStorage.removeItem('isAppFirstLaunched');
  // }, []);

  useEffect(()=>{setIsAppFirstLaunched(true)},[])

  if(isAppFirstLaunched == true) 
    return <Redirect href="/onboarding" />
  return <Redirect href="/home" />
};

export default App;
