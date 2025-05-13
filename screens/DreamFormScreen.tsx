import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function DreamFormScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString());

  const handleSaveDream = async () => {
    if (!title || !mood || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const newDream = {
      id: Date.now().toString(),
      title,
      mood,
      description,
      created_at: createdAt,
    };

    try {
      const stored = await AsyncStorage.getItem("dreams");
      const dreams = stored ? JSON.parse(stored) : [];

      await AsyncStorage.setItem(
        "dreams",
        JSON.stringify([...dreams, newDream])
      );

      navigation.goBack();
    } catch (error) {
      console.error("Error saving dream:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Mood"
        value={mood}
        onChangeText={setMood}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Save Dream" onPress={handleSaveDream} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  date: {
    fontSize: 14,
    marginVertical: 8,
    color: "#888",
  },
});
