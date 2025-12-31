import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useSearchParams } from "expo-router";
import { useAuth } from "@/constants/context/AuthContextProps";
import CustomButton from "../../components/CustomButton";

const Confirmation = () => {
  const router = useRouter();
  const { email } = useSearchParams(); // e-mail z rejestracji
  const { confirmUserEmail } = useAuth();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [serverError, setServerError] = useState<string | null>(null);

  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // focus na kolejny input
      if (text && index < 5) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;

    setServerError(null);
    const result = await confirmUserEmail(email, fullCode);

    if (!result.ok) {
      setServerError(result.message);
    } else {
      router.replace("/auth/confirmation-success");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex justify-center items-center p-6">
      <Text className="text-2xl font-semibold mb-4">Potwierdź swój email</Text>
      <Text className="mb-6 text-gray-700">Wpisz kod wysłany na <Text className="font-semibold">{email}</Text></Text>

      <View className="flex-row justify-between w-full max-w-xs mb-6">
        {code.map((digit, i) => (
          <TextInput
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={digit}
            onChangeText={(text) => handleChange(text, i)}
            keyboardType="number-pad"
            maxLength={1}
            className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg"
          />
        ))}
      </View>

      {serverError && <Text className="text-red-500 mb-4">{serverError}</Text>}

      <CustomButton title="Potwierdź email" handlePress={handleSubmit} containerStyles="bg-blue-500 w-full max-w-xs" textStyles="text-white" />
    </SafeAreaView>
  );
};

export default Confirmation;
