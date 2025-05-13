import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  mood: string;
  description: string;
  created_at: string;
};

export default function DreamItem({
  title,
  mood,
  description,
  created_at,
}: Props) {
  let formattedDate = "Unknown date";

  if (created_at && !isNaN(new Date(created_at).getTime())) {
    formattedDate = new Date(created_at).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  console.log("RAW created_at:", created_at);
  console.log("Formatted Date:", formattedDate);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.mood}>{mood}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // elevation: 3,
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  mood: {
    color: "#888",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
});
