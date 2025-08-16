import { FETCH_LAUNCHPAD_DETAIL } from "@/constants/config";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailsTab from "./DetailsTab";
import MapTab from "./MapTab";

const Tab = createMaterialTopTabNavigator();

export default function MissionDetailsLayout() {
  const { launchpad_id } = useLocalSearchParams<{ launchpad_id: string }>();

  const [missionDetail, setMissionDetail] = useState(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(`${FETCH_LAUNCHPAD_DETAIL}${launchpad_id}`);
        const json = await res.json();
        if (mounted) setMissionDetail(json);
      } catch (e) {
        console.warn("Launchpad fetch failed:", e);
      }
    })();

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const loc = await Location.getCurrentPositionAsync({});
          if (mounted) {
            setUserLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });
          }
        }
      } catch (e) {
        console.warn("Location fetch failed:", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [launchpad_id]);

  if (!missionDetail) {
    return (
      <View style={styles.box}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
        }}
      >
        <Tab.Screen name="Details">
          {() => <DetailsTab missionDetail={missionDetail} />}
        </Tab.Screen>
        <Tab.Screen name="Map">
          {() => (
            <MapTab missionDetail={missionDetail} userLocation={userLocation} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
    root:{ flex: 1 },
    box:{ flex: 1, alignItems: "center", justifyContent: "center" },
})