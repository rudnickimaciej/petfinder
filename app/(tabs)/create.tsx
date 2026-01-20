import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type PostType = "missing" | "found";
type Gender = "male" | "female" | "unknown";
type AnimalType = "dog" | "cat" | "other";
type IsVaccinated = "yes" | "no" | "unknown";

type BaseForm = {
  postType: PostType;

  animalType: AnimalType;
  name?: string;
  age?: string; // trzymamy jako string w UI
  gender: Gender;

  breedId?: string;
  description?: string;

  lastSeenPlaceDescription?: string;
  lastSeenLatitude?: string;
  lastSeenLongitude?: string;

  // zdjęcia
  photos: string[]; // np. uri
};

type MissingForm = {
  missingDate: string; // yyyy-mm-dd
  isVaccinated: IsVaccinated;
  microchipNumber?: string;
  reward?: string;
};

type FoundForm = {
  foundDate: string; // yyyy-mm-dd
  isSecured: boolean;
};

const SegmentedSwitch = ({
  value,
  onChange,
}: {
  value: PostType;
  onChange: (v: PostType) => void;
}) => {
  return (
    <View className="flex-row bg-gray-100 rounded-2xl p-1">
      <TouchableOpacity
        onPress={() => onChange("missing")}
        className={`flex-1 py-3 rounded-2xl ${
          value === "missing" ? "bg-white" : ""
        }`}
      >
        <Text
          className={`text-center font-semibold ${
            value === "missing" ? "text-black" : "text-gray-500"
          }`}
        >
          Zaginęło
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChange("found")}
        className={`flex-1 py-3 rounded-2xl ${
          value === "found" ? "bg-white" : ""
        }`}
      >
        <Text
          className={`text-center font-semibold ${
            value === "found" ? "text-black" : "text-gray-500"
          }`}
        >
          Znalezione
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Text className="font-semibold text-gray-800 mb-2">{children}</Text>
);

const RequiredStar = () => <Text className="text-red-500">*</Text>;

const Input = ({
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}: {
  value?: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
}) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor="#9ca3af"
    multiline={multiline}
    keyboardType={keyboardType ?? "default"}
    className={`bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-[15px] ${
      multiline ? "min-h-[120px]" : ""
    }`}
    style={{ textAlignVertical: multiline ? "top" : "center" }}
  />
);

const SelectPill = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full border ${
      active ? "bg-black border-black" : "bg-white border-gray-200"
    }`}
  >
    <Text className={`${active ? "text-white" : "text-gray-700"} font-semibold`}>
      {label}
    </Text>
  </TouchableOpacity>
);

const PetPostCreateScreen: React.FC = () => {
  const [form, setForm] = useState<BaseForm>({
    postType: "missing",
    animalType: "dog",
    name: "",
    age: "",
    gender: "unknown",
    breedId: undefined,
    description: "",
    lastSeenPlaceDescription: "",
    lastSeenLatitude: "",
    lastSeenLongitude: "",
    photos: [],
  });

  const [missing, setMissing] = useState<MissingForm>({
    missingDate: "",
    isVaccinated: "unknown",
    microchipNumber: "",
    reward: "",
  });

  const [found, setFound] = useState<FoundForm>({
    foundDate: "",
    isSecured: false,
  });

  const isMissing = form.postType === "missing";

  // Minimalna walidacja pod UI
  const validation = useMemo(() => {
    const errors: Record<string, string> = {};

    if (!form.description || form.description.trim().length < 40) {
      errors.description = "Opis musi mieć min. 40 znaków.";
    }

    if (!form.lastSeenPlaceDescription?.trim()) {
      errors.lastSeenPlaceDescription = "Podaj lokalizację/opis miejsca.";
    }

    if (isMissing) {
      if (!missing.missingDate.trim()) errors.missingDate = "Podaj datę zaginięcia.";
    } else {
      if (!found.foundDate.trim()) errors.foundDate = "Podaj datę znalezienia.";
    }

    return errors;
  }, [form, missing, found, isMissing]);

  const canSubmit = Object.keys(validation).length === 0;

  const addFakePhoto = () => {
    // w realu: expo-image-picker -> uri
    const uri = `fake://photo-${Date.now()}`;
    setForm(prev => ({ ...prev, photos: [...prev.photos, uri] }));
  };

  const removePhoto = (uri: string) => {
    setForm(prev => ({ ...prev, photos: prev.photos.filter(p => p !== uri) }));
  };

  const submit = () => {
    // tutaj zmapujesz na MissingPet / FoundPet pod API
    // - Age: parseInt(form.age)
    // - lat/lng: parseFloat
    // itd.

    const payload =
      form.postType === "missing"
        ? {
            ...form,
            ...missing,
            age: form.age ? Number(form.age) : null,
            reward: missing.reward ? Number(missing.reward) : null,
            lastSeenLatitude: form.lastSeenLatitude
              ? Number(form.lastSeenLatitude)
              : null,
            lastSeenLongitude: form.lastSeenLongitude
              ? Number(form.lastSeenLongitude)
              : null,
          }
        : {
            ...form,
            ...found,
            age: form.age ? Number(form.age) : null,
            lastSeenLatitude: form.lastSeenLatitude
              ? Number(form.lastSeenLatitude)
              : null,
            lastSeenLongitude: form.lastSeenLongitude
              ? Number(form.lastSeenLongitude)
              : null,
          };

    console.log("SUBMIT PAYLOAD", payload);
  };

  return (
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>

    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-[34px] font-extrabold text-gray-900">
            Dodaj ogłoszenie
          </Text>
          <Text className="mt-2 text-gray-600 font-medium">
            Im więcej szczegółów, tym lepiej!
          </Text>

          <View className="mt-4">
            <SegmentedSwitch
              value={form.postType}
              onChange={v => setForm(prev => ({ ...prev, postType: v }))}
            />
          </View>
        </View>

        {/* Photos */}
        <View className="px-4 mt-6">
          <FieldLabel>Dodaj zdjęcia</FieldLabel>

          <TouchableOpacity
            onPress={addFakePhoto}
            className="rounded-3xl border border-gray-200 bg-gray-50 py-10 items-center"
          >
            <Ionicons name="images-outline" size={28} color="#111827" />
            <Text className="mt-3 font-semibold text-gray-900 underline">
              Dodaj zdjęcia
            </Text>
          </TouchableOpacity>

          {form.photos.length > 0 && (
            <View className="mt-4 flex-row flex-wrap">
              {form.photos.map(uri => (
                <View
                  key={uri}
                  className="w-[30%] mr-[3.33%] mb-3 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden"
                >
                  <View className="h-16 items-center justify-center">
                    <Ionicons name="image-outline" size={22} color="#6b7280" />
                    <Text className="text-[11px] text-gray-500 mt-1">zdjęcie</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removePhoto(uri)}
                    className="absolute top-2 right-2 bg-white/90 rounded-full p-1 border border-gray-200"
                  >
                    <Ionicons name="close" size={14} color="#111827" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Fields */}
        <View className="px-4 mt-6">
          <FieldLabel>
            Tytuł ogłoszenia <RequiredStar />
          </FieldLabel>

          <Input
            value={
              form.postType === "missing"
                ? `Zaginął ${form.animalType === "dog" ? "pies" : form.animalType === "cat" ? "kot" : "zwierzak"}`
                : `Znaleziono ${form.animalType === "dog" ? "psa" : form.animalType === "cat" ? "kota" : "zwierzaka"}`
            }
            onChangeText={() => {}}
            placeholder="np. Zaginął pies w okolicy..."
          />

          <Text className="text-gray-500 text-xs mt-2">
            Sugestia: tytuł możesz robić automatycznie (dla UX jak OLX).
          </Text>
        </View>

        {/* Category / Animal type */}
        <View className="px-4 mt-6">
          <FieldLabel>
            Rodzaj zwierzęcia <RequiredStar />
          </FieldLabel>

          <View className="flex-row flex-wrap gap-2">
            <SelectPill
              label="Pies"
              active={form.animalType === "dog"}
              onPress={() => setForm(prev => ({ ...prev, animalType: "dog" }))}
            />
            <SelectPill
              label="Kot"
              active={form.animalType === "cat"}
              onPress={() => setForm(prev => ({ ...prev, animalType: "cat" }))}
            />
            <SelectPill
              label="Inne"
              active={form.animalType === "other"}
              onPress={() => setForm(prev => ({ ...prev, animalType: "other" }))}
            />
          </View>
        </View>

        {/* Name / Age / Gender */}
        <View className="px-4 mt-6">
          <FieldLabel>Imię (opcjonalnie)</FieldLabel>
          <Input
            value={form.name}
            onChangeText={t => setForm(prev => ({ ...prev, name: t }))}
            placeholder="np. Luna"
          />

          <View className="mt-4">
            <FieldLabel>Wiek (opcjonalnie)</FieldLabel>
            <Input
              value={form.age}
              onChangeText={t => setForm(prev => ({ ...prev, age: t }))}
              placeholder="np. 3"
              keyboardType="numeric"
            />
          </View>

          <View className="mt-4">
            <FieldLabel>Płeć</FieldLabel>
            <View className="flex-row flex-wrap gap-2">
              <SelectPill
                label="Nieznana"
                active={form.gender === "unknown"}
                onPress={() => setForm(prev => ({ ...prev, gender: "unknown" }))}
              />
              <SelectPill
                label="Samiec"
                active={form.gender === "male"}
                onPress={() => setForm(prev => ({ ...prev, gender: "male" }))}
              />
              <SelectPill
                label="Samica"
                active={form.gender === "female"}
                onPress={() => setForm(prev => ({ ...prev, gender: "female" }))}
              />
            </View>
          </View>
        </View>

        {/* Date section depends on type */}
        <View className="px-4 mt-6">
          {isMissing ? (
            <>
              <FieldLabel>
                Data zaginięcia <RequiredStar />
              </FieldLabel>
              <Input
                value={missing.missingDate}
                onChangeText={t => setMissing(prev => ({ ...prev, missingDate: t }))}
                placeholder="YYYY-MM-DD"
              />
              {validation.missingDate && (
                <Text className="text-red-500 mt-2 font-semibold">
                  {validation.missingDate}
                </Text>
              )}

              <View className="mt-4">
                <FieldLabel>Szczepienie</FieldLabel>
                <View className="flex-row flex-wrap gap-2">
                  <SelectPill
                    label="Nie wiem"
                    active={missing.isVaccinated === "unknown"}
                    onPress={() => setMissing(prev => ({ ...prev, isVaccinated: "unknown" }))}
                  />
                  <SelectPill
                    label="Tak"
                    active={missing.isVaccinated === "yes"}
                    onPress={() => setMissing(prev => ({ ...prev, isVaccinated: "yes" }))}
                  />
                  <SelectPill
                    label="Nie"
                    active={missing.isVaccinated === "no"}
                    onPress={() => setMissing(prev => ({ ...prev, isVaccinated: "no" }))}
                  />
                </View>
              </View>

              <View className="mt-4">
                <FieldLabel>Nr chipu (opcjonalnie)</FieldLabel>
                <Input
                  value={missing.microchipNumber}
                  onChangeText={t =>
                    setMissing(prev => ({ ...prev, microchipNumber: t }))
                  }
                  placeholder="np. 985170002345678"
                />
              </View>

              <View className="mt-4">
                <FieldLabel>Nagroda (opcjonalnie)</FieldLabel>
                <Input
                  value={missing.reward}
                  onChangeText={t => setMissing(prev => ({ ...prev, reward: t }))}
                  placeholder="np. 500"
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : (
            <>
              <FieldLabel>
                Data znalezienia <RequiredStar />
              </FieldLabel>
              <Input
                value={found.foundDate}
                onChangeText={t => setFound(prev => ({ ...prev, foundDate: t }))}
                placeholder="YYYY-MM-DD"
              />
              {validation.foundDate && (
                <Text className="text-red-500 mt-2 font-semibold">
                  {validation.foundDate}
                </Text>
              )}

              <View className="mt-4 flex-row items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                <View className="flex-row items-center">
                  <Ionicons name="shield-checkmark-outline" size={20} color="#111827" />
                  <Text className="ml-3 font-semibold text-gray-900">
                    Zwierzę zabezpieczone
                  </Text>
                </View>

                <Switch
                  value={found.isSecured}
                  onValueChange={v => setFound(prev => ({ ...prev, isSecured: v }))}
                />
              </View>

              <Text className="text-xs text-gray-500 mt-2">
                Jeśli zwierzę jest zabezpieczone, ogłoszenie może kierować do miejsca odbioru.
              </Text>
            </>
          )}
        </View>

        {/* Location */}
        <View className="px-4 mt-6">
          <FieldLabel>
            Lokalizacja <RequiredStar />
          </FieldLabel>

          <Input
            value={form.lastSeenPlaceDescription}
            onChangeText={t =>
              setForm(prev => ({ ...prev, lastSeenPlaceDescription: t }))
            }
            placeholder="np. Wrocław, Krzyki – okolice Parku Południowego"
          />
          {validation.lastSeenPlaceDescription && (
            <Text className="text-red-500 mt-2 font-semibold">
              {validation.lastSeenPlaceDescription}
            </Text>
          )}

          <View className="mt-4">
            <FieldLabel>Współrzędne (opcjonalnie)</FieldLabel>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Input
                  value={form.lastSeenLatitude}
                  onChangeText={t =>
                    setForm(prev => ({ ...prev, lastSeenLatitude: t }))
                  }
                  placeholder="Latitude"
                  keyboardType="numeric"
                />
              </View>

              <View className="flex-1">
                <Input
                  value={form.lastSeenLongitude}
                  onChangeText={t =>
                    setForm(prev => ({ ...prev, lastSeenLongitude: t }))
                  }
                  placeholder="Longitude"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity className="mt-3 flex-row items-center justify-center py-4 rounded-2xl border border-gray-200 bg-white">
              <Ionicons name="location-outline" size={18} color="#111827" />
              <Text className="ml-2 font-semibold text-gray-900">
                Wybierz na mapie
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View className="px-4 mt-6">
          <FieldLabel>
            Opis <RequiredStar />
          </FieldLabel>

          <Input
            value={form.description}
            onChangeText={t => setForm(prev => ({ ...prev, description: t }))}
            placeholder="Wpisz tu najważniejsze informacje: wygląd, cechy szczególne, obroża, numer telefonu, gdzie widziany itd."
            multiline
          />

          <View className="mt-2 flex-row justify-between">
            <Text className="text-gray-500 text-xs">
              Wpisz przynajmniej 40 znaków
            </Text>
            <Text className="text-gray-500 text-xs">
              {form.description?.length ?? 0}/9000
            </Text>
          </View>

          {validation.description && (
            <View className="mt-2 flex-row items-center">
              <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />
              <Text className="ml-2 text-red-500 font-semibold">
                {validation.description}
              </Text>
            </View>
          )}
        </View>

        {/* Contact section - jak na screenie */}
        <View className="px-4 mt-10 pb-10">
          <Text className="text-[22px] font-extrabold text-gray-900">
            Kontakt do Ciebie
          </Text>

          <View className="mt-6">
            <FieldLabel>
              Lokalizacja <RequiredStar />
            </FieldLabel>
            <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row justify-between items-center">
              <Text className="text-gray-400 font-semibold">Wybierz</Text>
              <Ionicons name="chevron-down" size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <FieldLabel>
              Osoba kontaktowa <RequiredStar />
            </FieldLabel>
            <View className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row justify-between items-center">
              <Text className="text-gray-900 font-semibold">Maciek</Text>
              <Ionicons name="checkmark" size={20} color="#10b981" />
            </View>
          </View>

          <View className="mt-4">
            <FieldLabel>
              E-mail <RequiredStar />
            </FieldLabel>
            <View className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row justify-between items-center">
              <Text className="text-gray-900 font-semibold">
                maciejrudnicki@outlook.com
              </Text>
              <Ionicons name="checkmark" size={20} color="#10b981" />
            </View>
          </View>

          <View className="mt-4">
            <FieldLabel>Numer telefonu</FieldLabel>
            <View className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex-row justify-between items-center">
              <Text className="text-gray-900 font-semibold">787897857</Text>
              <Ionicons name="checkmark" size={20} color="#10b981" />
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity className="mt-8 rounded-full border border-gray-200 py-4 items-center">
            <Text className="font-semibold text-gray-900">Zobacz przed dodaniem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!canSubmit}
            onPress={submit}
            className={`mt-4 rounded-full py-5 items-center ${
              canSubmit ? "bg-[#0f3a3a]" : "bg-gray-300"
            }`}
          >
            <Text className="text-white font-extrabold text-[16px]">
              Dodaj ogłoszenie
            </Text>
          </TouchableOpacity>

          {!canSubmit && (
            <Text className="mt-3 text-gray-500 text-xs">
              Uzupełnij wymagane pola (opis min. 40 znaków + data + lokalizacja).
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
      </SafeAreaView>

  );
};

export default PetPostCreateScreen;
