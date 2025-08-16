import { MISSION_DETAILS } from "@/constants/string";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsTab({ missionDetail }: any) {
  const detailsData = [
    { label: MISSION_DETAILS.NAME, value: missionDetail.name },
    { label: MISSION_DETAILS.DETAILS, value: missionDetail.details },
    { label: MISSION_DETAILS.REGION, value: missionDetail.region },
    { label: MISSION_DETAILS.LOCALITY, value: missionDetail.locality },
    { label: MISSION_DETAILS.ATTEMPTS, value: missionDetail.launch_attempts },
    { label: MISSION_DETAILS.SUCCESS, value: missionDetail.launch_successes },
    { label: MISSION_DETAILS.STATUS, value: missionDetail.status },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {!!missionDetail.images?.large?.[0] && (
          <Image
            source={{ uri: missionDetail.images.large[0] }}
            style={styles.img}
          />
        )}
        {detailsData.map((item) => (
          <View key={item.label} style={styles.row}>
            <Text style={styles.label}>{item.label}:</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex:1,
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
    width:'20%',
  },
  value: {
    flex: 1,
    flexWrap: "wrap",
  },
});
