import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const navigation = useNavigation();
  const canGoBack = useNavigationState((state) => state.index > 0);

  return (
    <View style={styles.header}>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Claw LegalTech</Text>
      <Text style={styles.title2}>Developed Mahesh Bairi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    textAlign: "center",
    textAlignVertical: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  title2: {
    fontSize: 15,
    fontStyle: "italic",
    fontFamily: "serif",
    padding: 5,
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
});
