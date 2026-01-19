import React, { useState } from "react";
import { Alert, ScrollView, View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "@/constants/context/AuthContextProps";
interface FormState {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const router = useRouter();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
    const [serverError, setServerError] = useState<string | null>(null);
    const { login

     } = useAuth();
  

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Błąd", "Wypełnij wszystkie pola");
      return;
    }
    setServerError(null);
    setSubmitting(true);
    try {
      const response = await login(form.email, form.password)
      if(response.ok){
        router.replace("/home");
      } else {
        setServerError(response.message);
      }
    } catch (error: any) {
      setServerError(error.message);

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          className="w-full px-6 pt-10"
          style={{ minHeight: Dimensions.get("window").height - 100 }}
        >
          <Text className="text-4xl font-bold text-center text-black">
            <Text className="text-blue-500">PetFinder</Text>
          </Text>

          <View className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
            <Text className="text-2xl font-semibold text-black mb-4">
              Zaloguj się
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-4"
              keyboardType="email-address"
              placeholder="Email"
            />

            <FormField
              title="Hasło"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-6"
              placeholder="Hasło"
              isPassword
            />
            {serverError && <Text className="text-red-500 mt-3">{serverError}</Text>}
            

            <CustomButton
              title="Zaloguj się"
              handlePress={submit}
              containerStyles="mt-6 bg-blue-500"
              textStyles="text-white"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-6 flex-row gap-2">
              <Text className="text-lg text-gray-700">
                Nie masz konta?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-bold text-blue-500"
              >
                Załóż konto
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
