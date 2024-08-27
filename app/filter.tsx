import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import {Colors} from '../constants/Colors'

const PetFilterScreen: React.FC = () => {
    const router = useRouter();
    const [selectedSort, setSelectedSort] = useState('recommended');
    const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);
    const [petType, setPetType] = useState('dog');
    const [breed, setBreed] = useState('');
    const [location, setLocation] = useState('');
    const [searchRadius, setSearchRadius] = useState(5);
    const [searchType, setSearchType] = useState('lost'); // New state for radio options

    const colorScheme = useColorScheme();  // Determine if light or dark mode is active
    const colors = Colors[colorScheme || 'light'];  // Get colors based on the current color scheme

    const saveFilter = () => {
        // Implement saving and passing filter logic
        router.push('/search');
    };

    // Example breed data based on pet type
    const dogBreeds = ['Labrador', 'Golden Retriever', 'Bulldog'];
    const catBreeds = ['Persian', 'Siamese', 'Maine Coon'];
    const otherBreeds = ['Hamster', 'Rabbit', 'Guinea Pig'];

    const getBreeds = () => {
        switch (petType) {
            case 'dog':
                return dogBreeds;
            case 'cat':
                return catBreeds;
            case 'other':
                return otherBreeds;
            default:
                return [];
        }
    };

    return (
        <View className="flex-1 p-4 pt-10 bg-white">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold">Filtry</Text>
                <TouchableOpacity onPress={() => { /* Clear filter logic */ }}>
                    <Text className="text-sm font-bold text-gray-500">WYCZYŚĆ FILTRY</Text>
                </TouchableOpacity>
            </View>

            <Text className="mt-4 font-bold">Rodzaj wyszukiwania</Text> 
            <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                    className={`flex-1 mr-2 p-2 rounded ${searchType === 'lost' ? 'bg-blue-400' : 'bg-gray-200'}`}
                    onPress={() => setSearchType('lost')}
                >
                    <Text className="text-center text-white">Szukaj zaginionych zwierząt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 p-2 rounded ${searchType === 'found' ? 'bg-blue-400' : 'bg-gray-200'}`}
                    onPress={() => setSearchType('found')}
                >
                    <Text className="text-center text-white">Szukaj znalezione zwierzęta</Text>
                </TouchableOpacity>
            </View>

            <Text className="mt-4 font-bold">Zwierzę</Text>
            <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                    className={`flex-1 mr-2 p-2 rounded ${selectedSort === 'recommended' ? 'bg-blue-400' : 'bg-gray-200'}`}
                    onPress={() => setSelectedSort('recommended')}
                >
                    <Text className="text-center text-white">Pies</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 mr-2 p-2 rounded ${selectedSort === 'newest' ? 'bg-blue-400' : 'bg-gray-200'}`}
                    onPress={() => setSelectedSort('newest')}
                >
                    <Text className="text-center text-white">Kot</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 p-2 rounded ${selectedSort === 'closest' ? 'bg-blue-400' : 'bg-gray-200'}`}
                    onPress={() => setSelectedSort('closest')}
                >
                    <Text className="text-center text-white">Inne</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-6">
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold">Suwak</Text>
                    <View className="flex-row items-center">
                        <Text className="text-sm">Jakiś suwak</Text>
                        <Switch
                            value={isDeliveryAvailable}
                            onValueChange={setIsDeliveryAvailable}
                            className="ml-2"
                        />
                    </View>
                </View>

                <View className="mt-4">
                    <Text className="font-bold">Wybierz rasę</Text>
                    <View className="mt-2 border rounded-lg border-gray-300">
                        <Picker
                            selectedValue={breed}
                            onValueChange={(itemValue) => setBreed(itemValue)}
                            style={{ height: 50 }}
                            enabled={getBreeds().length > 0} // Disable if no breeds are available
                        >
                            <Picker.Item label="Wybierz rasę" value="" />
                            {getBreeds().map((breedOption) => (
                                <Picker.Item key={breedOption} label={breedOption} value={breedOption} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View className="mt-4">
                    <Text className="font-bold">Wybierz lokalizację</Text>
                    <TouchableOpacity
                        className="mt-2 p-3 border rounded-lg border-gray-300"
                        onPress={() => {/* Handle location selection */}}
                    >
                        <Text className="text-gray-500">{location || 'Wybierz'}</Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-4">
                    <Text className="font-bold">Zasięg wyszukiwania (km)</Text>
                    <Slider
                        minimumValue={1}
                        maximumValue={100}
                        step={1}
                        value={searchRadius}
                        onValueChange={setSearchRadius}
                        style={{ width: '100%', height: 40 }}
                    />
                    <Text className="text-center mt-2">{searchRadius} km</Text>
                </View>
            </View>

            <TouchableOpacity
                className="mt-8 bg-blue-500 p-4 rounded-lg"
                onPress={saveFilter}
            >
                <Text className="text-center text-white text-lg">Gotowe</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PetFilterScreen;
