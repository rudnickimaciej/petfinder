import React, { useState } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useRouter } from "expo-router";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "@/constants/context/AuthContextProps";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Nieprawidłowy email").required("Email jest wymagany"),
  password: Yup.string().min(8, "Hasło min 8 znaków").required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasła nie są takie same")
    .required("Potwierdzenie hasła jest wymagane"),
});

const SignUp = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

 const submit = async (values: any) => {
  setServerError(null);
  setSubmitting(true); // <-- start loading
  try {
    const result = await register(values.email, values.password, values.confirmPassword);

    if (!result.ok) {
      setServerError(result.message);
    } else {
      router.push({ pathname: "/(auth)/confirmation", params: { email: values.email } });
    }
  } catch (err: any) {
    setServerError(err.message);
  } finally {
    setSubmitting(false); // <-- stop loading
  }
};


  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full px-6 pt-10" style={{ minHeight: Dimensions.get("window").height - 100 }}>
          <Text className="text-4xl font-bold text-center text-black">
            <Text className="text-blue-500">PetFinder</Text>
          </Text>
          <View className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
            <Text className="text-2xl font-semibold text-black mb-4">Załóż konto</Text>

            <Formik
              initialValues={{ email: "", password: "", confirmPassword: "" }}
              validationSchema={SignUpSchema}
              onSubmit={submit}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <FormField title="Email" value={values.email} handleChangeText={handleChange("email")} otherStyles="mt-4" keyboardType="email-address" placeholder="Email" />
                  {touched.email && errors.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}

                  <FormField title="Hasło" value={values.password} handleChangeText={handleChange("password")} otherStyles="mt-4" placeholder="Hasło" isPassword />
                  {touched.password && errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}

                  <FormField title="Potwierdź hasło" value={values.confirmPassword} handleChangeText={handleChange("confirmPassword")} otherStyles="mt-4" placeholder="Potwierdź hasło" isPassword />
                  {touched.confirmPassword && errors.confirmPassword && <Text className="text-red-500 mt-1">{errors.confirmPassword}</Text>}

                  {serverError && <Text className="text-red-500 mt-3">{serverError}</Text>}

                  <CustomButton title="Utwórz konto" handlePress={handleSubmit as any} containerStyles="mt-6 bg-blue-500" textStyles="text-white" isLoading={submitting} />
                  
                              <View className="flex justify-center pt-6 flex-row gap-2">
                                <Text className="text-lg text-gray-700">
                                 Masz już konto?
                                </Text>
                                <Link
                                  href="/sign-in"
                                  className="text-lg font-bold text-blue-500"
                                >
                                  Zaloguj się
                                </Link>
                              </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
