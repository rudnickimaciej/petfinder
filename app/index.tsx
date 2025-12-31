import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Animated } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/constants/context/AuthContextProps";

const Index: React.FC = () => {
  const { isLogged, loading } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
          <Text style={styles.title}>PetFinder</Text>
          <ActivityIndicator size="large" color="#4f46e5" style={{ marginTop: 20 }} />
        </Animated.View>
      </View>
    );
  }

  return <Redirect href={isLogged ? "/home" : "/sign-in"} />;
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937", // dark background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4f46e5", // primary color
  },
});
