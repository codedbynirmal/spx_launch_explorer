import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
  <>
  <StatusBar style="inverted" />
  <Stack initialRouteName="index" screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="Discover" options={{ title: "Discover" }} />
      <Stack.Screen name="MissionDetails" options={{ title: "Details" }} />
      </Stack>
  </>
  );
}
