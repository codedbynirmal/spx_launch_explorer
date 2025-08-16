import { MISSION_DETAILS } from "@/constants/string";
import { Launchpad } from "@/types/app";
import React from "react";
import { Button, Linking, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  missionDetail: Launchpad;
  userLocation: { latitude: number; longitude: number } | null;
};

export default function MapTab({ missionDetail, userLocation }: Props) {
  const openInMaps = () => {
    const lat = missionDetail.latitude;
    const lng = missionDetail.longitude;
    const label = missionDetail.full_name;
    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(
            label
          )}`
        : `geo:0,0?q=${lat},${lng}(${encodeURIComponent(label)})`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: missionDetail.latitude,
          longitude: missionDetail.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation
        scrollEnabled={false}
        rotateEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: missionDetail.latitude,
            longitude: missionDetail.longitude,
          }}
          title={missionDetail.full_name}
          description={missionDetail.locality}
        />

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title={MISSION_DETAILS.YOU}
            pinColor="blue"
          />
        )}
      </MapView>

      <View style={styles.buttonBar}>
        <Button title={MISSION_DETAILS.OPEN_MAPS} onPress={openInMaps} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonBar: { position: "absolute", left: 16, right: 16, bottom: 16 },
});
