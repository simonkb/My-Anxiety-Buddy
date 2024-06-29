// // import * as Notifications from "expo-notifications";
// // import * as Permissions from "expo-permissions";
// // import { Platform } from "react-native";
// // //To run notifications in forground
// // Notifications.setNotificationHandler({
// //   handleNotification: async () => {
// //     return {
// //       shouldShowAlert: true,
// //     };
// //   },
// // });
// // //notification
// // const triggerNotifications = async () => {
// //   await Notifications.scheduleNotificationAsync({
// //     content: {
// //       title: "You've got mail! 📬",
// //       body: "Here is the notification body",
// //       data: { data: "goes here" },
// //     },
// //     trigger: { seconds: 2 },
// //   });
// // };
// // useEffect(() => {
// //   if (Platform.OS === "ios")
// //     Permissions.getAsync(Permissions.NOTIFICATIONS)
// //       .then((statusObj) => {
// //         if (statusObj.status !== "granted") {
// //           return Permissions.askAsync(Permissions.NOTIFICATIONS);
// //         }
// //         return statusObj;
// //       })
// //       .then((statusObj) => {
// //         if (statusObj.status !== "granted") {
// //           return;
// //         }
// //       });
// // }, []);
// import { useEffect } from "react";
// import { Platform } from "react-native";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";

// // To run notifications in the foreground
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//   }),
// });

// // Function to schedule a daily notification at a specific time
// const scheduleDailyNotification = async (hour, minute) => {
//   // Calculate the delay until the next specified time
//   const now = new Date();
//   const targetTime = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     hour,
//     minute
//   );
//   let delay = targetTime.getTime() - now.getTime();
//   if (delay < 0) {
//     delay += 24 * 60 * 60 * 1000; // Add 24 hours if the target time has already passed
//   }

//   // Schedule the notification trigger
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Time to reflect!",
//       body: "Don't forget to reflect on your day, this will boost your productivity",
//       data: { data: "goes here" },
//     },
//     trigger: { seconds: Math.floor(delay / 1000) },
//   });
// };

// useEffect(() => {
//   const getNotificationPermission = async () => {
//     if (Platform.OS === "ios") {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       if (status !== "granted") {
//         // Handle the case when permission is not granted
//         return;
//       }
//     }
//   };

//   getNotificationPermission();
// }, []);

// useEffect(() => {
//   const scheduleNotifications = async () => {
//     const selectedHour = 20; // Example: 8:00pm
//     const selectedMinute = 0;

//     await scheduleDailyNotification(selectedHour, selectedMinute);
//   };

//   scheduleNotifications();
// }, []);

// export default scheduleDailyNotification;
