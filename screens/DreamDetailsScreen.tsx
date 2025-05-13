import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DreamDetailRouteProp = RouteProp<RootStackParamList, "DreamDetail">;

export default function DreamDetailScreen() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "DreamDetail">>();
  const { dream } = useRoute<DreamDetailRouteProp>().params;

  const formattedDate = new Date(dream.created_at);
  const dateStr = !isNaN(formattedDate.getTime())
    ? formattedDate.toLocaleString()
    : "Unknown date";

  const handleDeleteDream = async () => {
    try {
      const stored = await AsyncStorage.getItem("dreams");
      const parsed = stored ? JSON.parse(stored) : [];

      const updatedDreams = parsed.filter((d: any) => d.id !== dream.id);

      await AsyncStorage.setItem("dreams", JSON.stringify(updatedDreams));

      navigation.navigate("Journal");
    } catch (error) {
      console.error("Error deleting dream:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Title: <Text style={styles.value}>{dream.title}</Text>
      </Text>
      <Text style={styles.label}>
        Mood: <Text style={styles.value}>{dream.mood}</Text>
      </Text>
      <Text style={styles.label}>
        Created Date: <Text style={styles.value}>{dateStr}</Text>
      </Text>
      <Text style={styles.label}>
        Description: <Text style={styles.value}>{dream.description}</Text>
      </Text>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteDream}
        >
          <Text style={styles.buttonText}>Delete Dream</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  value: {
    fontStyle: "italic",
    fontWeight: "normal",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mood: {
    fontSize: 18,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
  },
});
