import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import HealthKit from "rn-apple-healthkit";
//import Fitness from "@ovalmoney/react-native-fitness";

const ReadAppleWatch = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [respiratoryRate, setRespiratoryRate] = useState(null);
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState(null);

  // const getPermissions = () => {
  //   const permissions = {
  //     permissions: {
  //       read: ["HeartRate", "RespiratoryRate", "OxygenSaturation"],
  //     },
  //   };

  //   return new Promise((resolve, reject) => {
  //     HealthKit.initHealthKit(permissions, (err, results) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(results);
  //       }
  //     });
  //   });
  // };

  // const getHeartRateData = async () => {
  //   try {
  //     const options = {
  //       startDate: new Date(2022, 1, 1).toISOString(),
  //       endDate: new Date().toISOString(),
  //       unit: "count/min",
  //       type: "HeartRate",
  //     };

  //     const result = await HealthKit.getSamples(options);
  //     setHeartRate(result[0]?.value);
  //   } catch (error) {
  //     console.log("Error getting heart rate data:", error);
  //   }
  // };

  // const getRespiratoryRateData = async () => {
  //   try {
  //     const options = {
  //       startDate: new Date(2022, 1, 1).toISOString(),
  //       endDate: new Date().toISOString(),
  //       unit: "count/min",
  //       type: "RespiratoryRate",
  //     };

  //     const result = await HealthKit.getSamples(options);
  //     setRespiratoryRate(result[0]?.value);
  //   } catch (error) {
  //     console.log("Error getting respiratory rate data:", error);
  //   }
  // };

  // const getBloodOxygenLevelData = async () => {
  //   try {
  //     const options = {
  //       startDate: new Date(2022, 1, 1).toISOString(),
  //       endDate: new Date().toISOString(),
  //       unit: "percent",
  //       type: "OxygenSaturation",
  //     };

  //     const result = await HealthKit.getSamples(options);
  //     setBloodOxygenLevel(result[0]?.value);
  //   } catch (error) {
  //     console.log("Error getting blood oxygen level data:", error);
  //   }
  // };

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     try {
  //       await getPermissions();
  //       getHeartRateData();
  //       getRespiratoryRateData();
  //       getBloodOxygenLevelData();
  //     } catch (error) {
  //       console.log("Error requesting health data permission:", error);
  //     }
  //   };
  //   requestPermissions();
  // }, []);

  // const permissions = [
  //   {
  //     kind: Fitness.PermissionKinds.HeartRate,
  //     access: Fitness.PermissionAccesses.Read,
  //   },
  // ];

  // Fitness.isAuthorized(permissions)
  //   .then((authorized) => {
  //     // Do something
  //     Alert.alert("Success", "Well done");
  //   })
  //   .catch((error) => {
  //     // Do something
  //     Alert.alert("Error", "Error");
  //   });
  return (
    <View>
      <Text>Heart rate: {heartRate} bpm</Text>
      <Text>Respiratory rate: {respiratoryRate} count/min</Text>
      <Text>Blood oxygen level: {bloodOxygenLevel}%</Text>
    </View>
  );
};

export default ReadAppleWatch;
