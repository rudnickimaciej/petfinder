import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimalType } from '@/types/AnimalType';
import { Breed } from '@/types/Bred';
import BreedPickerModal from './breedpickermodal';

type Props = {
  animalType: AnimalType;
  value?: Breed;
  onChange: (breed?: Breed) => void;
};

const BreedSelect: React.FC<Props> = ({ animalType, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Dropdown */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
      >
        <Text className={value ? 'text-black' : 'text-gray-500'}>
          {value?.name ?? 'Wybierz rasę'}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#666" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={open} animationType="slide">
        <BreedPickerModal
          animalType={animalType}
          selectedBreedId={value?.id}
          onSelect={(breed) => {
            onChange(breed);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
};

export default BreedSelect;
