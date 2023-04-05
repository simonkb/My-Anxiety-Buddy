import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as RNHealth from "react-native-health";

export default function HealthDataComponent() {
  const [heartRate, setHeartRate] = useState(null);
  const [bloodOxygen, setBloodOxygen] = useState(null);
  const [respiratoryRate, setRespiratoryRate] = useState(null);

  useEffect(() => {
    // Request permission to read heart rate, blood oxygen level, and respiratory rate
    async function requestPermissions() {
      try {
        const granted = await RNHealth.requestAuthorization([
          "heart_rate",
          "blood_oxygen",
          "respiratory_rate",
        ]);
        if (!granted) {
          console.log("Permission denied");
          return;
        }
        console.log("Permission granted");
      } catch (error) {
        console.log(error);
      }
    }

    requestPermissions();
  }, []);

  useEffect(() => {
    // Get most recent heart rate
    async function getHeartRate() {
      const options = {
        unit: "bpm",
        startDate: new Date(2022, 3, 1).toISOString(),
        endDate: new Date().toISOString(),
        ascending: false,
        limit: 1,
      };

      try {
        const heartRateSamples = await RNHealth.getHeartRateSamples(options);
        if (heartRateSamples.length > 0) {
          setHeartRate(heartRateSamples[0].value);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Get most recent blood oxygen level
    async function getBloodOxygen() {
      const options = {
        unit: "%",
        startDate: new Date(2022, 3, 1).toISOString(),
        endDate: new Date().toISOString(),
        ascending: false,
        limit: 1,
      };

      try {
        const bloodOxygenSamples = await RNHealth.getBloodOxygenSamples(
          options
        );
        if (bloodOxygenSamples.length > 0) {
          setBloodOxygen(bloodOxygenSamples[0].value);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Get most recent respiratory rate
    async function getRespiratoryRate() {
      const options = {
        unit: "breaths/min",
        startDate: new Date(2022, 3, 1).toISOString(),
        endDate: new Date().toISOString(),
        ascending: false,
        limit: 1,
      };

      try {
        const respiratoryRateSamples = await RNHealth.getRespiratoryRateSamples(
          options
        );
        if (respiratoryRateSamples.length > 0) {
          setRespiratoryRate(respiratoryRateSamples[0].value);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getHeartRate();
    getBloodOxygen();
    getRespiratoryRate();
  }, []);

  return (
    <View>
      <Text>Heart Rate: {heartRate}</Text>
      <Text>Blood Oxygen: {bloodOxygen}</Text>
      <Text>Respiratory Rate: {respiratoryRate}</Text>
    </View>
  );
}
