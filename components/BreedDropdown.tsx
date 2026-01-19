import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";

interface Props {
  label: string;
  value: string;
  options: { id: string; name: string }[]; // poprawny zapis
  onSelect: (val: string) => void;
  error?: string | false | undefined;
}

const BreedDropdown = ({ label, value, options, onSelect, error }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <View className="mt-4">
      <Text className="text-base text-black font-semibold mb-1">{label}</Text>

      <TouchableOpacity
        className={`border-2 p-4 rounded-2xl ${error ? "border-red-500" : "border-gray-300"}`}
        onPress={() => setOpen(true)}
      >
        <Text className={`text-base ${value ? "text-black" : "text-gray-400"}`}>
          {value || "Wybierz rasę"}
        </Text>
      </TouchableOpacity>

      {error && <Text className="text-red-500 mt-1">{error}</Text>}

      <Modal visible={open} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-6 max-h-[60%]">
            <Text className="text-lg font-bold mb-4 text-center">
              Wybierz rasę
            </Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item.id);
                    setOpen(false);
                  }}
                  className="p-4 border-b"
                >
                  <Text className="text-base">{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setOpen(false)}
              className="mt-4 bg-gray-200 p-4 rounded-2xl"
            >
              <Text className="text-center font-semibold">Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BreedDropdown;
