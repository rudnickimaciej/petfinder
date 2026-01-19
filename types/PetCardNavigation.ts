import { Post } from '@/types/Post';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for your stack's route parameters
type RootStackParamList = {
  PetList: undefined;  // No parameters for the PetList screen
  PetCardDetail: { pet: Post }; // PetCardDetail requires a Pet object as a parameter
};

// Define a type for your navigation prop
type PetListNavigationProp = StackNavigationProp<RootStackParamList, 'PetList'>;
export default PetListNavigationProp;
