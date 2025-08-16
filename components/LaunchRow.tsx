import { LaunchItem } from "@/types/app";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type propType = {
  item: LaunchItem;
};

const LaunchRow = (props: propType) => {
  const formattedDate = useMemo(() => {
    return new Date(props.item.date_utc).toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [props.item.date_utc]);

  const navToDetails = useCallback(() => {
    router.push({
      pathname: "/MissionDetails/DetailsTab",
      params: { launchpad_id: props.item.launchpad },
    });
  }, [props.item]);

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={navToDetails}>
      <Image
        source={{ uri: props.item.links.patch.small }}
        style={styles.img}
      />
      <View style={styles.dataBox}>
        <View>
          <Text
            style={{ fontSize: 12 }}
          >{`Flight #${props.item.flight_number}`}</Text>
          <Text style={{ fontWeight: "bold" }}>{props.item.name}</Text>
          <Text style={{ fontSize: 13 }}>{formattedDate}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* {props.item.success && (
            // <Text style={{ color: "green", fontSize:10 }}>Success</Text>
          )} */}
          <Ionicons name="chevron-forward-outline" size={22} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LaunchRow;

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    borderStyle: "dotted",
  },
  dataBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "5%",
    flex: 1,
  },
  img: { height: 50, width: 50, borderWidth: 0.5 },
});
