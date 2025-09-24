import LaunchRow from "@/components/LaunchRow";
import { MISSIONS_LIST } from "@/constants/string";
import { LaunchListType } from "@/types/app";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FETCH_ALL_LAUNCHES_URL } from "../constants/config";

const Discover = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allLaunches, setAllLaunches] = useState<LaunchListType>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredLaunches, setFilteredLaunches] = useState<LaunchListType>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const fetchMissions = useCallback(() => {
    fetch(FETCH_ALL_LAUNCHES_URL)
      .then((res) => res.json())
      .then((res) => {
        setAllLaunches(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMissions();
  }, []);

  useEffect(() => {
    fetchMissions();
  }, []);

  useEffect(() => {
    const query = searchValue.toLowerCase();
    const filteredList = allLaunches.filter((launch) =>
      launch.name.toLowerCase().includes(query)
    );
    setFilteredLaunches(filteredList);
  }, [searchValue, allLaunches]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const searchHeader = useMemo(
    () => (
      <View style={styles.inputBox}>
        <TextInput
          value={searchValue}
          placeholder={MISSIONS_LIST.SEARCH}
          onChangeText={setSearchValue}
          style={styles.input}
        />
      </View>
    ),
    [searchValue]
  );

  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={searchHeader}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={filteredLaunches}
          renderItem={({ item }) => <LaunchRow item={item} currentTime={currentTime} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#000"]}
              tintColor="#000"
            />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text>{MISSIONS_LIST.NO_MATCH}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 30,
  },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 12,
    borderWidth: 0.5,
    padding: 14,
    width: "99%",
  },
  inputBox:{ paddingVertical: 8 },
});
