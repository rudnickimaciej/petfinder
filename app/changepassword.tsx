import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordInput = ({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <View className="mb-5">
      <Text className="text-[13px] text-zinc-500 font-psemibold mb-2">{label}</Text>

      <View className="flex-row items-center bg-white border border-zinc-200 rounded-xl px-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          placeholder="••••••••"
          className="flex-1 py-4 text-[16px] text-zinc-900 font-pregular"
        />
        <TouchableOpacity onPress={() => setSecure((p) => !p)} className="pl-3 py-3">
          <Ionicons name={secure ? "eye-off-outline" : "eye-outline"} size={20} color="#71717A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ChangePasswordScreen = ({ navigation }: { navigation: any }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const passwordRules = useMemo(() => {
    return [
      { ok: newPassword.length >= 8, label: "Użyj co najmniej 8 znaków" },
      {
        ok: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
        label: "Użyj liter (małe i wielkie)",
      },
      { ok: /\d/.test(newPassword), label: "Dodaj cyfrę" },
      { ok: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword), label: "Dodaj znak specjalny" },
      { ok: newPassword === repeatPassword && newPassword.length > 0, label: "Hasła są zgodne" },
    ];
  }, [newPassword, repeatPassword]);

  const canSubmit = passwordRules.every((r) => r.ok) && oldPassword.length > 0;

  const handleSubmit = async () => {
    // TODO: podłącz API / Firebase / Supabase etc.
    // await auth.changePassword(oldPassword, newPassword);

    Alert.alert("Sukces", "Hasło zostało zmienione.");
    navigation.goBack();
  };

  return (
    <ScrollView className="bg-white" contentContainerStyle={{ padding: 20 }}>
      <Text className="text-[22px] text-zinc-900 font-psemibold">Jak ustawić silne hasło</Text>

      <View className="mt-4 mb-6">
        {passwordRules.slice(0, 4).map((rule) => (
          <View key={rule.label} className="flex-row items-center mb-2">
            <Ionicons
              name={rule.ok ? "checkmark-circle" : "ellipse-outline"}
              size={18}
              color={rule.ok ? "#16A34A" : "#A1A1AA"}
            />
            <Text className="ml-2 text-[14px] text-zinc-600 font-pregular">{rule.label}</Text>
          </View>
        ))}
      </View>

      <PasswordInput label="Poprzednie hasło" value={oldPassword} onChangeText={setOldPassword} />
      <PasswordInput label="Nowe hasło" value={newPassword} onChangeText={setNewPassword} />
      <PasswordInput
        label="Ponownie nowe hasło"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />

      {/* extra: zgodność */}
      <View className="mb-6">
        {passwordRules.slice(4).map((rule) => (
          <View key={rule.label} className="flex-row items-center">
            <Ionicons
              name={rule.ok ? "checkmark-circle" : "close-circle"}
              size={18}
              color={rule.ok ? "#16A34A" : "#DC2626"}
            />
            <Text className="ml-2 text-[14px] text-zinc-600 font-pregular">{rule.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        disabled={!canSubmit}
        onPress={handleSubmit}
        activeOpacity={0.85}
        className={`rounded-xl py-4 items-center ${
          canSubmit ? "bg-teal-500" : "bg-zinc-200"
        }`}
      >
        <Text className={`text-[16px] font-psemibold ${canSubmit ? "text-white" : "text-zinc-500"}`}>
          Zmień hasło
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangePasswordScreen;
