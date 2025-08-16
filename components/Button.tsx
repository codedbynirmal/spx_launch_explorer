import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { ImageBackground } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type propTypes = {
  // width?: string|number;
  title: string;
  style?: ViewStyle;
  icon?: IconProps<any>["name"];
  onPress: ()=>void;
};

const Button = (props: propTypes) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, { ...props.style }]}
      onPress={props.onPress}
    >
      <ImageBackground
        style={styles.image}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Hyades.jpg/1200px-Hyades.jpg",
        }}
      >
        <Text style={styles.text}>{props.title}</Text>
        {props.icon && <Ionicons name={props.icon} size={18} color="#ffffff" />}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "75%",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#ffffff", fontWeight: "bold", marginHorizontal: 5 },
});
