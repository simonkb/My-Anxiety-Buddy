// import React, { useState, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Button,
//   Platform,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Swipeable } from "react-native-gesture-handler";
// import bg1 from "../../assets/bg1.jpeg";
// import bg2 from "../../assets/bg2.jpg";
// import bg3 from "../../assets/bg3.jpg";
// import { setGlobalState, useGlobalState } from "../states/state.js";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";

// //To run notifications in foreground
// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldShowAlert: true,
//     };
//   },
// });
// const DummyNotifications = [
//   {
//     id: "1",
//     title: "Journal of the day",
//     message: "Don't forget to write about today and reflect on your day.",
//     read: false,
//   },
//   {
//     id: "2",
//     title: "High Heart Rate Alert",
//     message: "Your heart rate is above the normal range. Are you feeling okay?",
//     read: false,
//   },
//   {
//     id: "3",
//     title: "Check out our new content",
//     message: "We have added some exciting new content today. Take a look!",
//     read: true,
//   },
// ];

// const NotificationCard = ({ notification, onDelete, onPress }) => {
//   const renderRightActions = () => (
//     <View style={styles.deleteAction}>
//       <Text style={styles.deleteText}>Delete</Text>
//     </View>
//   );

//   return (
//     <Swipeable
//       renderRightActions={renderRightActions}
//       onSwipeableRightOpen={onDelete}
//     >
//       <TouchableOpacity
//         style={[
//           styles.notificationCard,
//           notification.read && styles.readNotificationCard,
//         ]}
//         onPress={onPress}
//       >
//         <Text
//           style={[
//             styles.notificationTitle,
//             notification.read && styles.readNotificationTitle,
//           ]}
//         >
//           {notification.title}
//         </Text>
//         <Text
//           style={[
//             styles.notificationMessage,
//             notification.read && styles.readNotificationMessage,
//           ]}
//         >
//           {notification.message}
//         </Text>
//       </TouchableOpacity>
//     </Swipeable>
//   );
// };

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState(DummyNotifications);

//   const handleDeleteNotification = (notificationId) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.filter(
//         (notification) => notification.id !== notificationId
//       )
//     );
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) => ({
//         ...notification,
//         read: true,
//       }))
//     );
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//   };

//   const handleNotificationPress = (notificationId) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) =>
//         notification.id === notificationId
//           ? { ...notification, read: true }
//           : notification
//       )
//     );
//   };

//   const renderHeader = () => (
//     <View style={styles.header}>
//       <Text style={styles.headerTitle}>Notifications</Text>

//       <TouchableOpacity
//         onPress={handleClearAll}
//         style={{
//           flexDirection: "row",
//         }}
//       >
//         <Text style={{ color: "red" }}>Clear all</Text>
//         <MaterialIcons
//           name="clear"
//           size={18}
//           color="red"
//           style={styles.headerIcon}
//         ></MaterialIcons>
//       </TouchableOpacity>
//     </View>
//   );
//   let defaultBg = useGlobalState("defaultBackgroundImage");
//   let currentBg;
//   if (defaultBg[0] === "bgOrange") {
//     currentBg = bg3;
//   } else if (defaultBg[0] === "bgBlue") {
//     currentBg = bg2;
//   } else {
//     currentBg = bg1;
//   }
//   //notification
//   const triggerNotifications = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "You've got mail! 📬",
//         body: "Here is the notification body",
//         data: { data: "goes here" },
//       },
//       trigger: { seconds: 2 },
//     });
//   };
//   useEffect(() => {
//     if (Platform.OS === "ios")
//       Permissions.getAsync(Permissions.NOTIFICATIONS)
//         .then((statusObj) => {
//           if (statusObj.status !== "granted") {
//             return Permissions.askAsync(Permissions.NOTIFICATIONS);
//           }
//           return statusObj;
//         })
//         .then((statusObj) => {
//           if (statusObj.status !== "granted") {
//             return;
//           }
//         });
//   }, []);
//   return (
//     <View style={styles.container}>
//       <Image source={currentBg} style={styles.backgroundImage} />
//       {renderHeader()}
//       <Button
//         onPress={triggerNotifications}
//         title="Trigger Local Notifications"
//         color="#841584"
//         accessibilityLabel="Trigger Local Notifications"
//       />

//       {notifications.length > 0 ? (
//         <FlatList
//           data={notifications}
//           renderItem={({ item }) => (
//             <NotificationCard
//               notification={item}
//               onDelete={() => handleDeleteNotification(item.id)}
//               onPress={() => handleNotificationPress(item.id)}
//             />
//           )}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.notificationList}
//         />
//       ) : (
//         <Text
//           style={{
//             padding: 10,
//             alignSelf: "center",
//           }}
//         >
//           No notifications so far.
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#FFF",
//     //  alignItems: "center",
//     // justifyContent: "center",
//   },
//   backgroundImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingTop: 80,
//     backgroundColor: "white",
//     paddingBottom: 5,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "black",
//   },
//   headerIcon: {
//     marginLeft: 5,
//   },
//   notificationList: {
//     paddingVertical: 16,
//     alignItems: "center",
//     flex: 1,
//     width: "100%",
//   },
//   notificationCard: {
//     width: "90%",
//     //maxWidth: 350,
//     minWidth: "90%",
//     height: 100,
//     backgroundColor: "#FFF",
//     marginHorizontal: 10,
//     borderRadius: 8,
//     padding: 10,
//     elevation: 2,
//     margin: 2,
//   },
//   readNotificationCard: {
//     backgroundColor: "#EFEFEF",
//   },
//   notificationTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   readNotificationTitle: {
//     color: "#777",
//   },
//   notificationMessage: {
//     fontSize: 14,
//     marginTop: 4,
//     color: "#000",
//   },
//   readNotificationMessage: {
//     color: "#777",
//   },
//   deleteAction: {
//     backgroundColor: "#FF0000",
//     justifyContent: "center",
//     alignItems: "flex-end",
//     flex: 1,
//     paddingLeft: 15,
//   },
//   deleteText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginHorizontal: 5,
//   },
// });
// export default NotificationsPage;
