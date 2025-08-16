import Button from "@/components/Button";
import { LAUNCH } from "@/constants/string";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={style.root}>
      <View style={style.textBox}>
        <Text style={style.title}>{LAUNCH.SPACEX}</Text>
        <Text style={style.subtitle}>{LAUNCH.HEADER}</Text>
      </View>
      <LottieView
        autoPlay
        style={style.lottie}
        source={require("../assets/Rocket in Space (Transparent Background).json")}
      />
      <Button
        title={LAUNCH.DIVE}
        style={style.btn}
        icon="arrow-forward"
        onPress={() => router.push("/Discover")}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  textBox: { marginTop: "20%", justifyContent: "center", alignItems: "center" },
  lottie: {
    marginTop: "30%",
    width: "55%",
    height: "25%",
  },
  title: { fontWeight: "bold", fontSize: 22 },
  subtitle: { fontWeight: "semibold", fontSize: 22, marginTop: 10 },
  btn: { marginTop: "50%" },
});
