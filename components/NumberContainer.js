import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

export const NumberContainer = ({ style, children }) => {
  return (
    <View style={{...styles.container, ...style}}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.primary,
    fontSize: 22,
    paddingBottom: 3,
    fontFamily: "open-sans-bold",
  },
});
