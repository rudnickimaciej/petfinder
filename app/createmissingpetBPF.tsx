import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import MapView, { Marker } from "react-native-maps";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import BreedDropdown from "@/components/BreedDropdown";
import postService from "@/api/post.service";
import { useAuth } from "@/constants/context/AuthContextProps";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useUnsavedChangesGuard } from "@/hooks/useUnsavedChangesGuard";
import ConfirmExitModal from "@/components/ConfirmExitModal";
import PetMap from "@/components/PetMap";

const labels = ["Podstawowe dane", "Zdjęcia & Rasa", "Lokalizacja"];
const dogBreeds = [
  { id: "a3f2c1d4-7e8b-4a2f-9c0d-1b2e3f4a5b6c", name: "Nie wiem" },
  { id: "b7d6e4f3-2c1a-4b8d-9e0f-3a2b1c4d5e6f", name: "Mieszaniec" },
  { id: "c1e2f3a4-5b6c-4d7e-8f0a-2b3c4d5e6f7a", name: "Beagle" },
  { id: "d4f5a6b7-8c9d-4e0f-1a2b-3c4d5e6f7a8b", name: "Bernese Mountain Dog" },
  { id: "e7a8b9c0-1d2e-4f3a-5b6c-7d8e9f0a1b2c", name: "Boxer" },
  { id: "f0b1c2d3-4e5f-4a6b-8c9d-0e1f2a3b4c5d", name: "Bulldog" },
  { id: "a1c2d3e4-5f6b-4a7c-8d9e-0f1a2b3c4d5e", name: "Chihuahua" },
  { id: "b2d3e4f5-6a7c-4b8d-9e0f-1a2b3c4d5e6f", name: "Dachshund" },
  { id: "c3e4f5a6-7b8d-4c9e-0f1a-2b3c4d5e6f7a", name: "Dalmatian" },
  { id: "d4f5a6b7-8c9e-4d0f-1a2b-3c4d5e6f7a8b", name: "Doberman Pinscher" },
  { id: "e5a6b7c8-9d0f-4e1a-2b3c-4d5e6f7a8b9c", name: "French Bulldog" },
  { id: "f6b7c8d9-0e1a-4f2b-3c4d-5e6f7a8b9c0d", name: "German Shepherd" },
  { id: "a7c8d9e0-1f2b-4a3c-5d6e-7f8a9b0c1d2e", name: "Golden Retriever" },
  { id: "b8d9e0f1-2a3c-4b4d-6e7f-8a9b0c1d2e3f", name: "Labrador Retriever" },
  { id: "c9e0f1a2-3b4d-4c5e-7f8a-9b0c1d2e3f4a", name: "Pomeranian" },
  { id: "d0f1a2b3-4c5e-4d6f-8a9b-0c1d2e3f4a5b", name: "Poodle" },
  { id: "e1a2b3c4-5d6f-4e7a-9b0c-1d2e3f4a5b6c", name: "Rottweiler" },
  { id: "f2b3c4d5-6e7a-4f8b-0c1d-2e3f4a5b6c7d", name: "Shih Tzu" },
  { id: "a3c4d5e6-7f8b-4a9c-1d2e-3f4a5b6c7d8e", name: "Siberian Husky" },
  { id: "b4d5e6f7-8a9c-4b0d-2e3f-4a5b6c7d8e9f", name: "Yorkshire Terrier" },
];
const catBreeds = [ 
  { id: "a3f2c1d4-7e8b-4a2f-9c0d-1b2e3f4a5b6c", name: "Nie wiem" },
  { id: "c7d6e4f3-2c1a-4b8d-9e0f-3a2b1c4d5e6f", name: "Syjamski" },
  { id: "d7d6e4f3-2c1a-4b8d-9e0f-3a2b1c4d5e6f", name: "Maine Coon" },
  { id: "f1e2f3a4-5b6c-4d7e-8f0a-2b3c4d5e6f7a", name: "Pers" },];


const validationSchemas = [
  Yup.object({
    name: Yup.string().required("Imię jest wymagane"),
    age: Yup.number().required("Wiek jest wymagany"),
    description: Yup.string().required("Opis jest wymagany"),
  }),
  Yup.object({
    breed: Yup.string().required("Rasa jest wymagana"),
    photos: Yup.array().min(1, "Dodaj przynajmniej jedno zdjęcie"),
  }),
  Yup.object({
    lastSeenDate: Yup.date().required(),
    location: Yup.object().shape({
      latitude: Yup.number().required("Wskaż lokalizację"),
      longitude: Yup.number().required(),
    }),
  }),
  Yup.object({
    animalType: Yup.string().oneOf(["dog", "cat"]).required("Wybierz zwierzę"),
    name: Yup.string(),
    age: Yup.string(),
    description: Yup.string().required("Opis jest wymagany"),
  }),
];

const saveDraft = () => {Alert.alert("saved!")};

const CreateMissingPetFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {token} = useAuth();
  const [isDirty, setIsDirty] = useState(false);
  const {
    showModal,
    cancel,
    discard,
    saveAndExit,
  } = useUnsavedChangesGuard({
    enabled: isDirty,
    onSave: (() => Alert.alert("drafted")),
  });

  const FormikDirtyWatcher = ({ dirty }: { dirty: boolean }) => {
    useEffect(() => {
      setIsDirty(dirty);
    }, [dirty]);

    return null;
  };

  const pickImages = async (values: any, setFieldValue: any) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpeg"],
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      setFieldValue("photos", [...values.photos, ...result.assets]);
    }
  };

  const deleteImage = (values: any, setFieldValue: any, index: number) => {
    const updated = values.photos.filter((_: any, i: number) => i !== index);
    setFieldValue("photos", updated);
  };

  const openDatePicker = (setFieldValue: any, date: Date) => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      onChange: (_, selected) => setFieldValue("lastSeenDate", selected || date),
    });
  };

const submit = async (values: any) => {
  try {

    const response = await postService.publishMissingPetPost(values, token);
    Alert.alert("Sukces", "Zgłoszenie wysłane ❤️");
    console.log("Server response:", response);
  } catch (err: any) {
    console.log(err.message);
    Alert.alert("Błąd", err.message);
  }
};
const saveDraft = async (values: any) => {
  try {

    const response = await postService.draftMissingPetPost(values, token);
    Alert.alert("Sukces", "Zgłoszenie zapisane w statusie draft.");
    console.log("Server response:", response);
  } catch (err: any) {
    console.log(err.message);
    Alert.alert("Błąd", err.message);
  }
};
  return (
    <SafeAreaView className="bg-white h-full">
      <Formik
        initialValues={{
          animalType: "",
          name: "",
          age: "",
          description: "",
          breed: "",
          photos: [],
          lastSeenDate: new Date(),
          location: { latitude: 52.2297, longitude: 21.0122 },
        }}
        validationSchema={validationSchemas[currentStep]}
        onSubmit={submit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, validateForm, dirty }) => (
          <View className="flex-1 px-4">
            <FormikDirtyWatcher dirty={dirty} />

            <StepIndicator currentPosition={currentStep} labels={labels} stepCount={3} />

            <ScrollView className="mt-6">

              {currentStep === 0 && (
                <>
                  <Text className="text-xl font-semibold text-blue-700 mb-3">
                    Podaj podstawowe informacje — to bardzo pomaga innym użytkownikom
                  </Text>
                  <Text className="text-base mb-2">Wybierz rodzaj zwierzaka</Text>

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className={`px-4 py-3 rounded-2xl border-2 ${
                      values.animalType === "dog" ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                    onPress={() => {
                      setFieldValue("animalType", "dog");
                      setFieldValue("breed", ""); 
                    }}
                  >
                    <Text className="text-lg">🐶 Pies</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`px-4 py-3 rounded-2xl border-2 ${
                      values.animalType === "cat" ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                    onPress={() => {
                      setFieldValue("animalType", "cat");
                      setFieldValue("breed", ""); 
                    }}
                  >
                    <Text className="text-lg">🐱 Kot</Text>
                  </TouchableOpacity>
                </View>

                {touched.animalType && errors.animalType && (
                  <Text className="text-red-500 mt-2">{errors.animalType as string}</Text>
                )}
                  <FormField
                    title="Imię"
                    value={values.name}
                    placeholder="np. Luna"
                    handleChangeText={handleChange("name")}
                    error={touched.name && errors.name}
                  />

                  <FormField
                    title="Wiek"
                    value={values.age}
                    placeholder="np. 3 lata"
                    handleChangeText={handleChange("age")}
                    otherStyles="mt-4"
                    error={touched.age && errors.age}
                  />

                  <FormField
                    title="Opis"
                    value={values.description}
                    placeholder="Opisz charakterystyczne cechy, obrożę, zachowanie"
                    handleChangeText={handleChange("description")}
                    otherStyles="mt-4"
                    error={touched.description && errors.description}
                  />
                </>
              )}

              {currentStep === 1 && (
                <>
                  <Text className="text-xl font-semibold text-blue-700 mb-3">
                    Dodaj wyraźne zdjęcia — twarz i sylwetka pomagają najbardziej 📸
                  </Text>

                  <TouchableOpacity
                    onPress={() => pickImages(values, setFieldValue)}
                    className="bg-blue-100 p-4 rounded-2xl"
                  >
                    <Text className="text-blue-600 text-center font-medium">
                      Dodaj zdjęcia
                    </Text>
                  </TouchableOpacity>

                  <ScrollView horizontal className="mt-4">
                    {values.photos.map((p: any, i: number) => (
                      <View key={i} className="mr-3 relative">
                        <Image source={{ uri: p.uri }} className="w-28 h-28 rounded-xl" />
                        <TouchableOpacity
                          onPress={() => deleteImage(values, setFieldValue, i)}
                          className="absolute -top-2 -right-2 bg-red-500 w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          <Text className="text-white font-bold">X</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>

                  {touched.photos && errors.photos && (
                    <Text className="text-red-500 mt-2">{errors.photos as string}</Text>
                  )}

                <BreedDropdown
                  label="Rasa"
                  value={values.breed}
                  options={values.animalType === "dog" ? dogBreeds : catBreeds}
                  onSelect={(val) => setFieldValue("BreadId", val)}
                  error={touched.breed && (errors.breed as string)}
                />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Text className="text-xl font-semibold text-blue-700 mb-3">
                    Ostatnia lokalizacja — wybierz miejsce na mapie 📍
                  </Text>
                  {/* <PetMap
                  latitude={values.location.latitude}
                  longitude={values.location.longitude}
                  onLocationChange={(coord) => setFieldValue('location', coord)}
                  height={260} */}
                {/* /> */}
                  {/* <MapView
                   style={{ width: '100%', height: 260 }}
                      provider="google"

                    initialRegion={{
                      latitude: values.location.latitude,
                      longitude: values.location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    onPress={(e) =>
                      setFieldValue("location", e.nativeEvent.coordinate)
                    }
                  >
                    <Marker
                      draggable
                      coordinate={values.location}
                      onDragEnd={(e) =>
                        setFieldValue("location", e.nativeEvent.coordinate)
                      }
                    />
                  </MapView> */}

                  <TouchableOpacity
                    className="mt-5 bg-blue-100 p-4 rounded-xl"
                    onPress={() => openDatePicker(setFieldValue, values.lastSeenDate)}
                  >
                    <Text className="text-blue-600 text-center">
                      Ostatnio widziany: {values.lastSeenDate.toDateString()}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>

            <View className="mt-6 mb-4 flex-row justify-between">

              {currentStep > 0 && (
                <CustomButton
                  title="Wstecz"
                  handlePress={() => setCurrentStep(s => s - 1)}
                  containerStyles="w-[48%]"
                  textStyles=""
                  isLoading = {false}
                />
              )}

              <CustomButton
                title={currentStep === 2 ? "Zgłoś zaginięcie" : "Dalej"}
                handlePress={async () => {
                  const validation = await validateForm();
            if (Object.keys(validation).length === 0) {
              currentStep === 2
                ? handleSubmit()
                : setCurrentStep(s => s + 1);
            } else {
              Alert.alert("Uzupełnij dane", "Upewnij się że krok jest poprawnie wypełniony");
            }
                }}
                containerStyles="w-[48%]"
                textStyles=""
                isLoading = {false}
              />
            </View>
          </View>
        )}
      </Formik>
      <ConfirmExitModal
      visible={showModal}
      onCancel={cancel}
      onDiscard={discard}
      onSave={saveAndExit}
    />
    </SafeAreaView>
  );
};

export default CreateMissingPetFlow;
