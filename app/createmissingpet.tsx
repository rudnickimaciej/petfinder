import React, { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

// import { useGlobalContext } from "../../context/GlobalProvider";

// Define the form's validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Pet name is required"),
  age: Yup.string().required("Age is required"),
  breed: Yup.string().required("Breed is required"),
  description: Yup.string().required("Description is required"),
  lastSeenLocation: Yup.string().required("Last seen location is required"),
  photo: Yup.mixed().required("A photo is required"),
});

const CreateMissingPet: React.FC = () => {
  // const { user } = useGlobalContext();
  const [uploading, setUploading] = useState<boolean>(false);

  const openPicker = async (setFieldValue: (field: string, value: any) => void) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
    });

    if (!result.canceled && result.assets) {
      setFieldValue("photo", result.assets[0]);
    } else {
      setTimeout(() => {
        Alert.alert("No file selected");
      }, 100);
    }
  };

  const showDatePicker = (setFieldValue: (field: string, value: any) => void, currentDate: Date) => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (event, selectedDate) => {
        const date = selectedDate || currentDate;
        setFieldValue("lastSeenDate", date);
      },
      mode: 'date',
    });
  };

  const handleSubmit = async (values: any) => {
    setUploading(true);
    try {
      // Implement your submit logic here

      Alert.alert("Success", "Missing pet registration submitted successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-4">

        <Formik
          initialValues={{
            name: "",
            age: "",
            breed: "",
            description: "",
            lastSeenLocation: "",
            lastSeenDate: new Date(),
            photo: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
            
            <View className="mt-7 space-y-2">

                <TouchableOpacity onPress={() => openPicker(setFieldValue)}>
                  {values.photo ? (
                    <Image
                      source={{ uri: values.photo.uri }}
                      resizeMode="cover"
                      className="w-full h-64 rounded-2xl"
                    />
                  ) : (
                    <View className="w-full h-40 px-4 bg-blue-100 rounded-2xl border border-blue-200 flex justify-center items-center">
                      <Text className="text-base text-blue-500">Wybierz zdjęcia</Text>
                    </View>
                  )}
                </TouchableOpacity>
                {touched.photo && errors.photo && (
                  <Text className="text-sm text-red-500">{errors.photo}</Text>
                )}
              </View>
              <FormField
                title="Imię zwierzaka"
                value={values.name}
                placeholder="Imię zwierzaka"
                handleChangeText={handleChange("name")}
                otherStyles="mt-4"
                error={touched.name && errors.name ? errors.name : undefined}
              />

              <FormField
                title="Wiek"
                value={values.age}
                placeholder="Wiek"
                handleChangeText={handleChange("age")}
                otherStyles="mt-4"
                error={touched.age && errors.age ? errors.age : undefined}
              />

              <FormField
                title="Rada"
                value={values.breed}
                placeholder="Rasa"
                handleChangeText={handleChange("breed")}
                otherStyles="mt-4"
                error={touched.breed && errors.breed ? errors.breed : undefined}
              />

              <FormField
                title="Opis"
                value={values.description}
                placeholder="Napisz coś o swoim zwierzaku"
                handleChangeText={handleChange("description")}
                otherStyles="mt-4"
                error={touched.description && errors.description ? errors.description : undefined}
              />

              <FormField
                title="Data zaginięcia"
                value={values.lastSeenLocation}
                placeholder="Data zaginięcia"
                handleChangeText={handleChange("lastSeenLocation")}
                otherStyles="mt-4"
                error={touched.lastSeenLocation && errors.lastSeenLocation ? errors.lastSeenLocation : undefined}
              />

              <View className="mt-4">
                <Text className="text-base text-blue-700">Last Seen Date</Text>
                <TouchableOpacity onPress={() => showDatePicker(setFieldValue, values.lastSeenDate)} className="mt-2">
                  <Text className="text-base text-blue-500">
                    {values.lastSeenDate.toDateString()}
                  </Text>
                </TouchableOpacity>
              </View>


              <CustomButton
                title="Dodaj zaginięcie"
                handlePress={handleSubmit as any}
                containerStyles="mt-7"
                isLoading={uploading}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMissingPet;
