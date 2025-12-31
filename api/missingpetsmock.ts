import { images } from '@/constants';
import { MissingPet, Pet } from '@/types/Pet';
import { User } from '@/types/User';

const user: User = {
  id: "1",
  name: 'Varsha',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',
}
export const missingPets: MissingPet[] = [
  {
    id: 1,
    name: 'Buddy',
    date: '2025-12-11',
    location: 'Warszawa',
    images: [images.missing_pet_1],
    age: "2",
    breed: "mieszaniec",
    sex: "suczka",
    story: "Simba to roczny samiec rasy beagle. Jest przyjazny dla ludzi i uwielbia bawić się swoją ulubioną piłką. Zaginął podczas spaceru w parku, kiedy nagle wybiegł za piłką i nie wrócił",
    temper: "przyjazna",
    user: user,
    type:"missing"
  },
  {
    id: 2,
    name: 'Luna',
    date: '2025-12-15',
    location: 'Pułtusk',
    images: [images.missing_pet_2],
    age: "3 miesiace",
    breed: "mieszaniec",
    sex: "suczka",
    story: "Simba to roczny samiec rasy beagle. Jest przyjazny dla ludzi i uwielbia bawić się swoją ulubioną piłką. Zaginął podczas spaceru w parku, kiedy nagle wybiegł za piłką i nie wrócił",
    temper: "przyjazna",
    user: user,
    type:"missing"
  },
  {
      id: 3,
      name: 'Sara',
    date: '2025-12-16',
      location: 'Pułtusk',
      images: [images.missing_pet_3],
      age: "3 miesiace",
      breed: "mieszaniec",
      sex: "suczka",
      story: "Simba to roczny samiec rasy beagle. Jest przyjazny dla ludzi i uwielbia bawić się swoją ulubioną piłką. Zaginął podczas spaceru w parku, kiedy nagle wybiegł za piłką i nie wrócił",
      temper: "przyjazna",
      user: user,
      type:"missing"
    },
    {
      id: 4,
      name: 'Tara',
    date: '2025-12-28',
      location: 'Ciechanów',
      images: [images.missing_pet_4],
      age: "3 miesiace",
      breed: "mieszaniec",
      sex: "suczka",
      story: "Simba to roczny samiec rasy beagle. Jest przyjazny dla ludzi i uwielbia bawić się swoją ulubioną piłką. Zaginął podczas spaceru w parku, kiedy nagle wybiegł za piłką i nie wrócił",
      temper: "przyjazna",
      user: user,
      type:"missing"
    },
    {
      id: 5,
      name: 'Kropka',
     date: '2025-12-25',
      location: 'Ciechanów',
      images: [images.missing_pet_5],
      age: "3 miesiace",
      breed: "mieszaniec",
      sex: "suczka",
      story: "Simba to roczny samiec rasy beagle. Jest przyjazny dla ludzi i uwielbia bawić się swoją ulubioną piłką. Zaginął podczas spaceru w parku, kiedy nagle wybiegł za piłką i nie wrócił",
      temper: "przyjazna",
      user: user,
      type:"missing"
    }
  ]
