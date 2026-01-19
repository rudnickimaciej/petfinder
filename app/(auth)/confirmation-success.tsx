import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";

const ConfirmationSuccess = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white h-full flex justify-center items-center p-6">
      <Text className="text-3xl font-bold mb-4 text-green-500">Konto aktywowane!</Text>
      <Text className="text-gray-700 mb-6 text-center">Twoje konto zostało pomyślnie potwierdzone. Możesz się teraz zalogować.</Text>

      <CustomButton
        title="Przejdź do logowania"
        handlePress={() => router.replace("/(auth)/sign-in")}
        containerStyles="bg-blue-500 w-full max-w-xs"
        textStyles="text-white"
        isLoading = {false}
      />
    </SafeAreaView>
  );
};

export default ConfirmationSuccess;
