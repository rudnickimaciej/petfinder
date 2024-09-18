import { images } from '@/constants';
import { FoundPet, Pet } from '@/types/Pet';
import { User } from '@/types/User';


const user: User = {
  id: "1",
  name: 'Varsha',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',

}
export  const foundPets: FoundPet[] = [
  {
    id: 10,
    date: '2024-09-15',
    location: 'Ciechanów',
    images: [images.found_pet_1],
    age: "unknown",
    breed: "unknown",
    sex: "suczka",
    story: "znalazłem pod sklepem pieska",
    temper: "przyjazna",
    user: user,
    type:"found"
  },
  {
    id: 20,
    date: '2024-09-16',
    location: 'Pułtusk',
    images: [images.found_pet_2],
    age: "unknown",
    breed: "unknown",
    sex: "suczka",
    story: "znalazłem pod sklepem pieska",
    temper: "przyjazna",
    user: user,
    type:"found"
  },
  {
      id: 30,
      date: '2024-09-17',
      location: 'Pułtusk',
      images: [images.found_pet_3],
      age: "unknown",
      breed: "unknown",
      sex: "suczka",
      story: "znalazłem pod sklepem pieska",
      temper: "przyjazna",
      user: user,
type:"found"

    },
    {
      id: 40,
      date: '2024-09-17',
      location: 'Warszawa',
      images: [images.found_pet_4],
      age: "unknown",
      breed: "unknown",
      sex: "suczka",
      story: "znalazłem pod sklepem pieska",
      temper: "przyjazna",
      user: user,
type:"found"

    },
    {
      id: 50,
      date: '2024-08-30',
      location: 'Warszawa',
      images: [images.found_pet_5],
      age: "unknown",
      breed: "unknown",
      sex: "suczka",
      story: "znalazłem pod sklepem pieska",
      temper: "przyjazna",
      user: user,
type:"found"

    }

];