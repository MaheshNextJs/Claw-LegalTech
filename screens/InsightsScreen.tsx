import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dream } from "../types";

const screenWidth = Dimensions.get("window").width;

const InsightsScreen = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [moodData, setMoodData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const stored = await AsyncStorage.getItem("dreams");
        const parsed: Dream[] = stored ? JSON.parse(stored) : [];
        setDreams(parsed);
        calculateMoodData(parsed);
      } catch (error) {
        console.error("Error fetching dreams:", error);
      }
    };

    fetchDreams();
  }, []);

  const calculateMoodData = (dreams: Dream[]) => {
    const moodCount: { [key: string]: number } = {};

    dreams.forEach((dream) => {
      if (dream.mood) {
        moodCount[dream.mood] = (moodCount[dream.mood] || 0) + 1;
      }
    });

    const chartData = Object.keys(moodCount).map((mood) => ({
      name: mood,
      population: moodCount[mood],
      color: getMoodColor(mood),
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));

    setMoodData(chartData);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Happy":
        return "#4CAF50";
      case "Sad":
        return "#F44336";
      case "Anxious":
        return "#FF9800";
      case "Excited":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Insights</Text>

      {moodData.length > 0 ? (
        <PieChart
          data={moodData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      ) : (
        <Text>No data available for mood distribution</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default InsightsScreen;
