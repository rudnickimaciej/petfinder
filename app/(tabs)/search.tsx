import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import PetCard from '@/components/PetCard';
import { Pet } from '@/types/Pet';

const petsData2 :Pet[] = [
    {
        id: 1,
        name: 'Buddy',
        address: 'Warsaw',
        image: 'buddy',
        date: '20 sierpnia 2024',
    },
    {
        id: 2,
        name: 'Luna',
        address: 'Warsaw',
        image: 'luna',
        date: '20 sierpnia 2024',
    },
    {
        id: 3,
        name: 'Buddy',
        address: 'Warsaw',
        image: 'buddy',
        date: '20 sierpnia 2024',
    },
];
const petsData = [
    {
        id: '1',
        name: 'Buddy',
        breed: 'Labrador',
        location: 'Warsaw',
        image: 'https://example.com/buddy.jpg',
        date: '20 sierpnia 2024',
    },
    {
        id: '2',
        name: 'Whiskers',
        breed: 'Persian Cat',
        location: 'Lublin',
        image: 'https://example.com/whiskers.jpg',
        date: 'Wczoraj 21:42',
    },
    {
        id: '3',
        name: 'Max',
        breed: 'German Shepherd',
        location: 'Krakow',
        image: 'https://example.com/max.jpg',
        date: '20 sierpnia 2024',
    },
];

const PetSearchScreen: React.FC = () => {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('Pulutsk');
    const [distance, setDistance] = useState('+0 km');
    const [sortPopupVisible, setSortPopupVisible] = useState(false);
    const [sortOption, setSortOption] = useState('recommended');

    const handleFilterPress = () => {
        router.push('/filter'); // Navigate to filter screen
    };

    const handleSortOption = (option: string) => {
        setSortOption(option);
        setSortPopupVisible(false);
    };

    const renderPetItem = ({ item }: { item: typeof petsData2[0] }) => (
        <PetCard pet = {item}/>
    );
    const renderPetItem2 = ({ item }: { item: typeof petsData2[0] }) => (
        <PetCard pet={item} />

    );
    return (
        <View className="flex-1 pt-8 bg-white">
            <View className="bg-white p-4 shadow-md">
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity onPress={handleFilterPress} className="flex-1 bg-blue-400 p-2 rounded-lg mr-2">
                        <Text className="text-center text-white font-bold">Filtruj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedFilter('All')} className="flex-1 bg-gray-200 p-2 rounded-lg mr-2">
                        <Text className="text-center text-gray-700">Wszystko</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedLocation('Pulutsk')} className="flex-1 bg-gray-200 p-2 rounded-lg mr-2">
                        <Text className="text-center text-gray-700">{selectedLocation}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDistance('+0 km')} className="flex-1 bg-blue-400 p-2 rounded-lg">
                        <Text className="text-center text-white">{distance}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="p-6 flex-row justify-between items-center">
                <Text className="font-semibold text-lg">Znaleźliśmy {petsData.length} ogłoszeń</Text>
                <View className="flex-row">
                    <TouchableOpacity onPress={() => setSortPopupVisible(!sortPopupVisible)} className="mr-4">
                        <Icon name="filter-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* TODO: Implement Map View */ }}>
                        <Icon name="map-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {sortPopupVisible && (
                <View style={{ position: 'absolute', right: 20, top: 140, zIndex: 10 }} className="bg-white border rounded-lg shadow-lg p-4">
                    <TouchableOpacity onPress={() => handleSortOption('recommended')} className="mb-2">
                        <Text className={`text-base ${sortOption === 'recommended' ? 'font-bold' : 'font-normal'}`}>
                            Polecane
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSortOption('newest')} className="mb-2">
                        <Text className={`text-base ${sortOption === 'newest' ? 'font-bold' : 'font-normal'}`}>
                            Najnowsze
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSortOption('closest')} className="mb-2">
                        <Text className={`text-base ${sortOption === 'closest' ? 'font-bold' : 'font-normal'}`}>
                            Najbliższe
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={petsData2}
                renderItem={renderPetItem }
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default PetSearchScreen;
