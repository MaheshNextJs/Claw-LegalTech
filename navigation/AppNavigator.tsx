import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JournalScreen from "../screens/JournalScreen";
import DreamFormScreen from "../screens/DreamFormScreen";
import InsightsScreen from "../screens/InsightsScreen";
import DreamDetailScreen from "../screens/DreamDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator id={undefined} initialRouteName="Journal">
      <Stack.Screen
        name="Journal"
        component={JournalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="New Dream" component={DreamFormScreen} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="DreamDetail" component={DreamDetailScreen} />
    </Stack.Navigator>
  );
}
