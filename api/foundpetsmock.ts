import { images } from '@/constants';
import { FoundPet, Pet } from '@/types/Pet'; 
import { User } from '@/types/User';

const user: User = { id: "1", name: 'Varsha', email: 'john.doe@example.com', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200', }

export const foundPets: FoundPet[] = [
  {
    id: 10,
    date: '2025-12-19',
    location: 'Ciechanów',
    images: [images.found_pet_1],
    age: "unknown",
    breed: "unknown",
    sex: "suczka",
    story: "Mała suczka błąkała się pod sklepem i wyglądała na zagubioną. Podchodzi chętnie do ludzi.",
    temper: "spokojna i ufna",
    user: user,
    type: "found"
  },
  {
    id: 20,
    date: '2025-12-28',
    location: 'Pułtusk',
    images: [images.found_pet_2],
    age: "unknown",
    breed: "unknown",
    sex: "suczka",
    story: "Znaleziono w okolicy parku. Była lekko przestraszona, ale szybko się uspokoiła.",
    temper: "łagodna",
    user: user,
    type: "found"
  },
  {
    id: 30,
    date: '2025-12-27',
    location: 'Pułtusk',
    images: [images.found_pet_3],
    age: "unknown",
    breed: "unknown",
    sex: "suczka",
    story: "Kręciła się kilka godzin w pobliżu bloków. Wygląda na zadbaną, możliwe że komuś uciekła.",
    temper: "kontaktowa",
    user: user,
    type: "found"
  },
  {
    id: 40,
    date: '2025-12-26',
    location: 'Warszawa',
    images: [images.found_pet_4],
    age: "unknown",
    breed: "unknown",
    sex: "suczka",
    story: "Znaleziono przy ruchliwej ulicy. Zareagowała spokojnie na pomoc.",
    temper: "przyjazna",
    user: user,
    type: "found"
  },
  {
    id: 50,
    date: '2025-12-11',
    location: 'Warszawa',
    images: [images.found_pet_5],
    age: "unknown",
    breed: "unknown",
    sex: "suczka",
    story: "Spacerowała samotnie po osiedlu, bez obroży. Szuka domu lub właściciela.",
    temper: "łagodna i towarzyska",
    user: user,
    type: "found"
  }
];
