import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import PushNotification from "react-native-push-notification";

function RoutinesScreen() {
  const [routines, setRoutines] = useState([]);
  const [newRoutine, setNewRoutine] = useState("");

  // Load example routines
  useEffect(() => {
    const exampleRoutines = [
      { id: 1, text: "I'll exercise every morning at 7am" },
      { id: 2, text: "I want to meditate every evening at 8pm" },
      { id: 3, text: "I need to read every day at 10am" },
    ];
    setRoutines(exampleRoutines);
  }, []);

  // Parse a routine string and schedule a reminder
  function scheduleReminder(routine) {
    // Parse the routine to determine when to schedule the reminder
    const [task, frequency, time] = parseRoutine(routine);

    // Schedule a daily reminder for the user at the specified time
    PushNotification.localNotificationSchedule({
      message: `Don't forget to ${task} today!`,
      date: new Date(`2023-02-25T${time}:00`),
      repeatType: frequency === "daily" ? "day" : "week",
    });
  }

  // Add a new routine and schedule a reminder
  function addRoutine() {
    if (!newRoutine) {
      return;
    }
    const newRoutines = [
      ...routines,
      { id: routines.length + 1, text: newRoutine },
    ];
    setRoutines(newRoutines);
    scheduleReminder(newRoutine);
    setNewRoutine("");
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        My Routines
      </Text>
      {routines.map((routine) => (
        <View key={routine.id} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>{routine.text}</Text>
        </View>
      ))}
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Add a new routine"
        value={newRoutine}
        onChangeText={setNewRoutine}
      />
      <Button title="Add" onPress={addRoutine} />
    </View>
  );
}

// Parse a routine string to extract the task, frequency, and time
function parseRoutine(routine) {
  const regex =
    /(?:I will|I'll|I want to|I need to) (.+?) (?:every (\w+)|today|tonight) (?:at (\d{1,2}(?::\d{2})?))?(?:\b|$)/i;
  const match = routine.match(regex);
  if (!match) {
    throw new Error("Invalid routine format");
  }
  const task = match[1];
  const frequency = match[2] || "daily";
  const time = match[3] || "09:00";
  return [task, frequency, time];
}

export default RoutinesScreen;
