import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import BleManager from "react-native-ble-manager";

// UUIDs for Apple Watch sensors
const HEART_RATE_UUID = "2A37";
const BLOOD_OXYGEN_UUID = "2A5E";
const RESPIRATORY_RATE_UUID = "2A92";

const AppleWatchSensorScreen = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState(null);
  const [respiratoryRate, setRespiratoryRate] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  useEffect(() => {
    // Start BLE manager
    BleManager.start({ showAlert: true });

    // Scan for nearby devices
    BleManager.scan([], 5, true)
      .then((results) => {
        console.log("Scanning...");
        setDeviceId(results.deviceId);
      })
      .catch((error) => {
        console.log("Error scanning:", error);
      });

    // Connect to Apple Watch
    BleManager.connect(deviceId)
      .then(() => {
        console.log("Connected to device!");
      })
      .catch((error) => {
        console.log("Error connecting to device:", error);
      });

    // Read heart rate data
    BleManager.read(deviceId, HEART_RATE_UUID)
      .then((data) => {
        setHeartRate(data);
      })
      .catch((error) => {
        console.log("Error reading heart rate:", error);
      });

    // Read blood oxygen level data
    BleManager.read(deviceId, BLOOD_OXYGEN_UUID)
      .then((data) => {
        setBloodOxygenLevel(data);
      })
      .catch((error) => {
        console.log("Error reading blood oxygen level:", error);
      });

    // Read respiratory rate data
    BleManager.read(deviceId, RESPIRATORY_RATE_UUID)
      .then((data) => {
        setRespiratoryRate(data);
      })
      .catch((error) => {
        console.log("Error reading respiratory rate:", error);
      });

    // // Disconnect from Apple Watch when component unmounts
    // return () => {
    //   BleManager.disconnect(deviceId)
    //     .then(() => {
    //       console.log("Disconnected from device.");
    //     })
    //     .catch((error) => {
    //       console.log("Error disconnecting from device:", error);
    //     });
    // };
  }, []);

  return (
    <View>
      <Text>Heart rate: {heartRate}</Text>
      <Text>Blood oxygen level: {bloodOxygenLevel}</Text>
      <Text>Respiratory rate: {respiratoryRate}</Text>
    </View>
  );
};

export default AppleWatchSensorScreen;
