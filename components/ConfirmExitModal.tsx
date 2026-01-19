import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

const ConfirmExitModal: React.FC<Props> = ({
  visible,
  onCancel,
  onDiscard,
  onSave,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white w-[85%] rounded-2xl p-6">
          <Text className="text-xl font-semibold mb-2">
            Niezapisane zmiany
          </Text>

          <Text className="text-gray-600 mb-6">
            Czy chcesz zapisać zgłoszenie jako draft?
          </Text>

          <TouchableOpacity
            className="bg-blue-600 rounded-xl p-4 mb-3"
            onPress={onSave}
          >
            <Text className="text-white text-center font-medium">
              💾 Zapisz draft
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-100 rounded-xl p-4 mb-3"
            onPress={onDiscard}
          >
            <Text className="text-red-600 text-center">
              Odrzuć zmiany
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onCancel}>
            <Text className="text-center text-gray-500">
              Anuluj
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmExitModal;
