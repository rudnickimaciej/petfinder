import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
  Models,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mrudnicki.petfinder",
  projectId: "66b3d3bc003580d4a35a",
  missingPetPhotosStorageId: "66b785d1000a34f1adb5",
  databaseId: "66b78314002290c871f0",
  userCollectionId: "66b7833b00033326ad80",
  missingPetsCollectionId: "66b7835a00189ed257d3",
  videoCollectionId: "your-video-collection-id", // Add this if needed for video posts
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

type User = Models.Document & {
  accountId: string;
  email: string;
  username: string;
  avatar: string;
};

type FileType = {
  mimeType: string;
  name: string;
  size: number;
  path: string;
  // Other fields you may need
};

// Register user
export async function createUser(
  email: string,
  password: string,
  username: string
): Promise<Models.Document> {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument<User>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl.href,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Sign In
export async function signIn(email: string, password: string): Promise<Models.Session> {
  try {
    const session = await account.createSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Get Account
export async function getAccount(): Promise<Models.User<Models.Preferences>> {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Get Current User
export async function getCurrentUser(): Promise<User | null> {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No account found");

    const currentUser = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw new Error("No user found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut(): Promise<void> {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw new Error(error as string);
  }
}

// Upload File
// export async function uploadFile(file: FileType, type: "image" | "video"): Promise<string | undefined> {
//   if (!file) return;

//   const { mimeType, ...rest } = file;
//   const asset = { type: mimeType, ...rest };

//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.missingPetPhotosStorageId, // Ensure you use the correct storage ID
//       ID.unique(),
//       asset as unknown as Blob // Depending on your implementation, you might need to convert to Blob or other types
//     );

//     const fileUrl = await getFilePreview(uploadedFile.$id, type);
//     return fileUrl;
//   } catch (error) {
//     throw new Error(error as string);
//   }
// }

// Get File Preview
// export async function getFilePreview(fileId: string, type: "image" | "video"): Promise<string> {
//   let fileUrl: URL;

//   try {
//     if (type === "video") {
//       fileUrl = storage.getFileView(appwriteConfig.missingPetPhotosStorageId, fileId);
//     } else if (type === "image") {
//       fileUrl = storage.getFilePreview(
//         appwriteConfig.missingPetPhotosStorageId,
//         fileId,
//         2000,
//         2000,
//         "top",
//         100
//       );
//     } else {
//       throw new Error("Invalid file type");
//     }

//     return fileUrl.href;
//   } catch (error) {
//     throw new Error(error as string);
//   }
// }

// Create Video Post
// export async function createVideoPost(form: {
//   title: string;
//   thumbnail: FileType;
//   video: FileType;
//   prompt: string;
//   userId: string;
// }): Promise<Models.Document> {
//   try {
//     const [thumbnailUrl, videoUrl] = await Promise.all([
//       uploadFile(form.thumbnail, "image"),
//       uploadFile(form.video, "video"),
//     ]);

//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       ID.unique(),
//       {
//         title: form.title,
//         thumbnail: thumbnailUrl,
//         video: videoUrl,
//         prompt: form.prompt,
//         creator: form.userId,
//       }
//     );

//     return newPost;
//   } catch (error) {
//     throw new Error(error as string);
//   }
// }

// Get all video posts
export async function getAllPosts(): Promise<Models.Document[]> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Get video posts created by user
export async function getUserPosts(userId: string): Promise<Models.Document[]> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Get video posts that match search query
export async function searchPosts(query: string): Promise<Models.Document[]> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Get latest created video posts
export async function getLatestPosts(): Promise<Models.Document[]> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}
