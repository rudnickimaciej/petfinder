import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';

const MissingPetSchema = Yup.object().shape({
  petName: Yup.string().required('Pet name is required'),
  petBreed: Yup.string().required('Pet breed is required'),
  dateOfMissing: Yup.date().required('Date of missing is required'),
  lastSeenLocation: Yup.string().required('Last seen location is required'),
});

export default function CreateMissingPetScreen() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [photos, setPhotos] = useState<Array<string>>([]);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePhotoPick = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 }, // Selection limit 0 allows multiple photos
      (response) => {
        if (response.didCancel || !response.assets) {
          return;
        }
        setPhotos(response.assets.map(asset => asset.uri || ''));
      }
    );
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Formik
        initialValues={{
          petName: '',
          petBreed: '',
          dateOfMissing: date,
          lastSeenLocation: '',
        }}
        validationSchema={MissingPetSchema}
        onSubmit={(values) => {
          // Submit logic goes here
          console.log(values);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            <Text className="text-xl font-bold mb-4">Create Missing Pet Record</Text>

            <View className="mb-4">
              <Text className="text-lg mb-2">Pet Name</Text>
              <TextInput
                className="border p-3 rounded-md"
                placeholder="Enter pet name"
                onChangeText={handleChange('petName')}
                onBlur={handleBlur('petName')}
                value={values.petName}
              />
              {errors.petName && touched.petName ? (
                <Text className="text-red-500">{errors.petName}</Text>
              ) : null}
            </View>

            <View className="mb-4">
              <Text className="text-lg mb-2">Pet Breed</Text>
              <TextInput
                className="border p-3 rounded-md"
                placeholder="Enter pet breed"
                onChangeText={handleChange('petBreed')}
                onBlur={handleBlur('petBreed')}
                value={values.petBreed}
              />
              {errors.petBreed && touched.petBreed ? (
                <Text className="text-red-500">{errors.petBreed}</Text>
              ) : null}
            </View>

            <View className="mb-4">
              <Text className="text-lg mb-2">Date of Missing</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="border p-3 rounded-md flex-row items-center">
                <FontAwesome5 name="calendar-alt" size={20} color="black" />
                <Text className="ml-2">{date ? date.toDateString() : 'Select date'}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    handleDateChange(event, selectedDate);
                    setFieldValue('dateOfMissing', selectedDate);
                  }}
                />
              )}
              {errors.dateOfMissing && touched.dateOfMissing ? (
                <Text className="text-red-500">{errors.dateOfMissing}</Text>
              ) : null}
            </View>

            <View className="mb-4">
              <Text className="text-lg mb-2">Last Seen Location</Text>
              <TextInput
                className="border p-3 rounded-md"
                placeholder="Enter last seen location"
                onChangeText={handleChange('lastSeenLocation')}
                onBlur={handleBlur('lastSeenLocation')}
                value={values.lastSeenLocation}
              />
              {errors.lastSeenLocation && touched.lastSeenLocation ? (
                <Text className="text-red-500">{errors.lastSeenLocation}</Text>
              ) : null}
            </View>

            <View className="mb-4">
              <Text className="text-lg mb-2">Pet Photos</Text>
              <TouchableOpacity
                onPress={handlePhotoPick}
                className="border p-3 rounded-md flex-row items-center justify-center mb-3 bg-gray-100">
                <FontAwesome5 name="camera" size={20} color="black" />
                <Text className="ml-2">Pick Photos</Text>
                
              </TouchableOpacity>
              <TouchableOpacity >
           
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
          </TouchableOpacity>
              <ScrollView horizontal className="flex-row">
                {photos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    className="w-24 h-24 mr-2 rounded-md"
                  />
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="bg-blue-500 p-3 rounded-md items-center mt-5">
              <Text className="text-white text-lg">Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
