// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { getCurrentUser } from "./../../lib/appwrite";

// // Define the shape of your user object here
// type User = {
//   id: string;
//   name: string;
//   email: string;
//   // Add other fields as needed
// } | null;

// type GlobalContextType = {
//   isLogged: boolean;
//   setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
//   loading: boolean;
// };

// // Create a context with default value undefined
// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// // Custom hook to use the GlobalContext
// export const useGlobalContext = (): GlobalContextType => {
//   const context = useContext(GlobalContext);
//   if (!context) {
//     throw new Error("useGlobalContext must be used within a GlobalProvider");
//   }
//   return context;
// };

// type GlobalProviderProps = {
//   children: ReactNode;
// };

// // GlobalProvider component
// const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
//   const [isLogged, setIsLogged] = useState<boolean>(false);
//   const [user, setUser] = useState<User>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     getCurrentUser()
//       .then((res) => {
//         if (res) {
//           setIsLogged(true);
//           setUser(res);
//         } else {
//           setIsLogged(false);
//           setUser(null);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <GlobalContext.Provider
//       value={{
//         isLogged,
//         setIsLogged,
//         user,
//         setUser,
//         loading,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalProvider;
