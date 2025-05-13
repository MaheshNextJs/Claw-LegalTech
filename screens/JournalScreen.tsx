import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { RootStackParamList, Dream } from "../types";
import DreamItem from "../components/DreamItem";
import Header from "../components/Header";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Journal">;

export default function JournalScreen() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchDreams();
  }, [isFocused]);

  const fetchDreams = async () => {
    try {
      const stored = await AsyncStorage.getItem("dreams");
      const parsed: Dream[] = stored ? JSON.parse(stored) : [];

      const formattedDreams = parsed.map((dream) => {
        if (dream.created_at && !isNaN(new Date(dream.created_at).getTime())) {
          dream.created_at = new Date(dream.created_at).toISOString();
        } else {
          dream.created_at = "Unknown date";
        }
        return dream;
      });

      const sorted = formattedDreams.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setDreams(sorted);
    } catch (error) {
      console.error("Error loading dreams:", error);
    }
  };

  const handleDreamPress = (dream: Dream) => {
    navigation.navigate("DreamDetail", { dream });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <TouchableOpacity>
        <Text
          style={{
            marginTop: "10%",
            textAlign: "center",
            backgroundColor: "#15cfb0",
            padding: 10,
            fontWeight: "bold",
            color: "white",
            borderRadius: 10,
            fontSize: 16,
          }}
          onPress={() => navigation.navigate("New Dream")}
        >
          Tap here to create a new dream
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity>
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "#15cfb0",
              padding: 10,
              color: "white",
              borderRadius: 10,
              fontSize: 16,
            }}
            onPress={() => navigation.navigate("Insights")}
          >
            View Insights
          </Text>
        </TouchableOpacity>
      </View>

      {dreams.length === 0 ? (
        <Text style={styles.emptyText}>
          No dreams yet. Tap above to create one!
        </Text>
      ) : (
        <>
          <Text style={styles.sectionHeader}>
            Here are the available Dreams:
          </Text>
          {dreams.map((dream) => (
            <TouchableOpacity
              style={{ marginTop: "10%" }}
              key={dream.id}
              onPress={() => handleDreamPress(dream)}
            >
              <DreamItem
                title={dream.title}
                mood={dream.mood}
                description={dream.description}
                created_at={dream.created_at}
              />
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: "15%",
    backgroundColor: "#e9f1f5",
    height: "100%",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
  sectionHeader: {
    marginTop: 30,
    fontSize: 18,

    color: "blue",
    textAlign: "center",
  },
});
