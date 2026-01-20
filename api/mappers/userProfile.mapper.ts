import { UserProfileResponse } from "../user.service";
import { UserProfile } from "@/types/UserProfile";

export const userProfileMapper = (
  response: UserProfileResponse
): UserProfile => ({
  id: response.id,
  name: response.name,
  avatar: response.avatarUrl
});

export default userProfileMapper;
