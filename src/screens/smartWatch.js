import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import HealthKit from "react-native-health";
const ReadSmartWatch = () => {
  const permissions = {
    permissions: {
      read: ["HeartRate", "RespiratoryRate"],
    },
  };

  const requestPermissions = async () => {
    try {
      const authorized = await HealthKit.requestPermissions(permissions);
      if (!authorized) {
        console.log("Authorization failed!");
      }
    } catch (error) {
      console.log("Error requesting health data permission:", error);
    }
  };
  // Call the requestPermissions function when the component mounts
  useEffect(() => {
    requestPermissions();
  }, []);

  const [heartRate, setHeartRate] = useState(null);
  const [respiratoryRate, setRespiratoryRate] = useState(null);

  const getHeartRateData = async () => {
    try {
      const options = {
        unit: "bpm",
        startDate: new Date(2022, 1, 1).toISOString(),
        endDate: new Date().toISOString(),
      };
      const result = await HealthKit.getHeartRateSamples(options);
      setHeartRate(result[0].value);
    } catch (error) {
      console.log("Error getting heart rate data:", error);
    }
  };

  const getRespiratoryRateData = async () => {
    try {
      const options = {
        unit: "count/min",
        startDate: new Date(2022, 1, 1).toISOString(),
        endDate: new Date().toISOString(),
      };
      const result = await HealthKit.getRespiratoryRateSamples(options);
      setRespiratoryRate(result[0].value);
    } catch (error) {
      console.log("Error getting respiratory rate data:", error);
    }
  };

  // Call the getHeartRateData and getRespiratoryRateData functions when the component mounts
  useEffect(() => {
    getHeartRateData();
    getRespiratoryRateData();
  }, []);

  return (
    <View>
      <Text>Heart rate: {heartRate} bpm</Text>
      <Text>Respiratory rate: {respiratoryRate} count/min</Text>
    </View>
  );
};
export default ReadSmartWatch;
