import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "@/constants/context/AuthContextProps";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy email")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(8, "Hasło musi mieć przynajmniej 8 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasła nie są takie same")
    .required("Potwierdzenie hasła jest wymagane"),
});

const SignUp: React.FC = () => {
  const router = useRouter();
  const { register, confirmUserEmail } = useAuth();

  const [isSubmitting, setSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const submit = async (values: any) => {
    setSubmitting(true);
    setServerError(null); 

    const result = await register(values.email, values.password, values.confirmPassword);

    if (!result.ok) {
      setServerError(result.message);
    } else {
      setRegisteredEmail(values.email);
      setShowConfirmation(true);
    }

    setSubmitting(false);
  };
  const submitConfirmation = async () => {
    if (!confirmationCode) {
      return;
    }

    setSubmitting(true);
    const result = await confirmUserEmail(registeredEmail, confirmationCode);

    if(!result.ok){
       setServerError(result.message);
    } else {
      router.replace("/sign-in");
    }
    setSubmitting(false);
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
            {!showConfirmation ? (
              <>
                <Text className="text-2xl font-semibold text-black mb-4">
                  Załóż konto
                </Text>

                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={submit}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                  }) => (
                    <>
                      <FormField
                        title="Email"
                        value={values.email}
                        handleChangeText={handleChange("email")}
                        otherStyles="mt-4"
                        keyboardType="email-address"
                        placeholder="Email"
                      />
                      {touched.email && errors.email && (
                        <Text className="text-red-500 mt-1">
                          {errors.email}
                        </Text>
                      )}

                      <FormField
                        title="Hasło"
                        value={values.password}
                        handleChangeText={handleChange("password")}
                        otherStyles="mt-4"
                        placeholder="Hasło"
                         isPassword

                      />
                      {touched.password && errors.password && (
                        <Text className="text-red-500 mt-1">
                          {errors.password}
                        </Text>
                      )}

                      <FormField
                        title="Potwierdź hasło"
                        value={values.confirmPassword}
                        handleChangeText={handleChange("confirmPassword")}
                        otherStyles="mt-4"
                        placeholder="Potwierdź hasło"
                        isPassword
                      />
                      {touched.confirmPassword &&
                        errors.confirmPassword && (
                          <Text className="text-red-500 mt-1">
                            {errors.confirmPassword}
                          </Text>
                        )}

                      <CustomButton
                        title="Utwórz konto"
                        handlePress={handleSubmit as any}
                        containerStyles="mt-6 bg-blue-500"
                        textStyles="text-white"
                        isLoading={isSubmitting}
                      />
                    </>
                  )}
                </Formik>
               {serverError && (
              <Text className="text-red-500 mt-3">
                {serverError}
              </Text>
)}    
                <View className="flex justify-center pt-5 flex-row gap-2">
                  <Text className="text-lg text-gray-600">
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
            ) : (
              <>
                <Text className="text-2xl font-semibold text-black">
                  Potwierdź swój email
                </Text>

                <Text className="mt-3 text-gray-700">
                  Kod wysłano na{" "}
                  <Text className="font-semibold">{registeredEmail}</Text>
                </Text>

                <FormField
                  title="Kod potwierdzający"
                  value={confirmationCode}
                  handleChangeText={setConfirmationCode}
                  otherStyles="mt-6"
                  placeholder="Wpisz kod"
                />

                <CustomButton
                  title="Potwierdź email"
                  handlePress={submitConfirmation}
                  containerStyles="mt-6 bg-blue-500"
                  textStyles="text-white"
                  isLoading={isSubmitting}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
