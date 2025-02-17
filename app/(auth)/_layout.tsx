import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import  Loader  from "../../components/loading/Loader";
// import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
//   const { loading, isLogged } = useGlobalContext();
const loading = false;
const isLogged = false;
  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            headerBackVisible: false
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
            headerBackVisible: false
          }}
        />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
