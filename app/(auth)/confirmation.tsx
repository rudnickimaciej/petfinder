import React, { useState, useRef } from "react";
import { Text, View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/constants/context/AuthContextProps";
import CustomButton from "../../components/CustomButton";
import { useLocalSearchParams } from "expo-router";

const Confirmation = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;
  const { confirmUserEmail } = useAuth();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = async (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Focus na kolejny input
      if (text && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }

      // Automatyczne submit po wpisaniu ostatniej cyfry
      if (index === 5 && text) {
        const fullCode = newCode.join("");
        if (fullCode.length === 6) {
          await handleSubmit(fullCode);
        }
      }
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      // Cofnij focus na poprzedni input
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (fullCodeParam?: string) => {
    const fullCode = fullCodeParam || code.join("");
    if (fullCode.length !== 6 || submitting) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const result = await confirmUserEmail(email, fullCode);

      if (result.ok) {
        router.replace("/(auth)/confirmation-success");
      } else {
        setServerError(result.message);
        // wyczyść cały kod
        setCode(["", "", "", "", "", ""]);
        inputsRef.current[0]?.focus();
      }
    } catch (err: any) {
      setServerError(err.message);
      setCode(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex justify-center items-center p-6">
      <Text className="text-2xl font-semibold mb-4">Potwierdź swój email</Text>
      <Text className="mb-6 text-gray-700">
        Wpisz kod wysłany na <Text className="font-semibold">{email}</Text>
      </Text>

      <View className="flex-row justify-between w-full max-w-xs mb-6">
        {code.map((digit, i) => (
          <TextInput
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={digit}
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            keyboardType="number-pad"
            maxLength={1}
            className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg"
          />
        ))}
      </View>

      {serverError && <Text className="text-red-500 mb-4">{serverError}</Text>}

      {/* <CustomButton
        title="Potwierdź email"
        handlePress={() => handleSubmit()}
        containerStyles="bg-blue-500 w-full max-w-xs"
        textStyles="text-white"
        isLoading={submitting}
      /> */}
    </SafeAreaView>
  );
};

export default Confirmation;
