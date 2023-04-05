// import HealthKit from "rn-healthkit";
// import { RNHealthKit } from "react-native-healthkit";
// import { Platform, View, Text } from "react-native";
// import { HealthValue } from "react-native-health";
// import { VideoFullscreenUpdate } from "expo-av";

// const HealthData = () => {
//   const healthKit = new HealthKit();
//   let heartRate = 0;
//   let respiratoryRate = 0;
//   let bloodOxygenLevel = 0;
//   const readHeartRate = async () => {
//     try {
//       heartRate = await healthKit.getHeartRateSamples({
//         startDate: new Date(2022, 1, 1).toISOString(),
//         endDate: new Date().toISOString(),
//         ascending: false,
//         limit: 1,
//       });
//       console.log("Heart Rate:", heartRate);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   const readRespiratoryRate = async () => {
//     try {
//       respiratoryRate = await healthKit.getRespiratoryRateSamples({
//         startDate: new Date(2022, 1, 1).toISOString(),
//         endDate: new Date().toISOString(),
//         ascending: false,
//         limit: 1,
//       });
//       console.log("Respiratory Rate:", respiratoryRate);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   const readBloodOxygenLevel = async () => {
//     try {
//       bloodOxygenLevel = await healthKit.getBloodOxygenSamples({
//         startDate: new Date(2022, 1, 1).toISOString(),
//         endDate: new Date().toISOString(),
//         ascending: false,
//         limit: 1,
//       });
//       console.log("Blood Oxygen Level:", bloodOxygenLevel);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   if (Platform.OS === "ios") {
//     readHeartRate();
//     readRespiratoryRate();
//     readBloodOxygenLevel();
//   } else if (Platform.OS === "android") {
//     HealthValue.getHeartRate((heartRate) =>
//       console.log("Heart Rate:", heartRate)
//     );
//     HealthValue.getRespiratoryRate((respiratoryRate) =>
//       console.log("Respiratory Rate:", respiratoryRate)
//     );
//     HealthValue.getBloodOxygen((bloodOxygenLevel) =>
//       console.log("Blood Oxygen Level:", bloodOxygenLevel)
//     );
//   }
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//       }}
//     >
//       <Text>Heart rate: {heartRate}</Text>
//       <Text>Respiratory: {respiratoryRate}</Text>
//       <Text>Blood Oxygen Level: {bloodOxygenLevel}</Text>
//     </View>
//   );
// };
// export default HealthData;
