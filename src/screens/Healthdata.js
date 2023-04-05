// // Write a react native component to read heart rate, blood oxygen level and respiratory rate from smart watchs and other wearable devices for my app. To create a React Native component that reads heart rate, blood oxygen level, and respiratory rate from smartwatches and other wearable devices, you'll need to use a third-party library that supports communication with these devices. One such library is `react-native-ble-plx`.

// // First, install the library:

// // ```bash
// // npm install --save react-native-ble-plx
// // cd ios && pod install && cd ..
// // ```

// // Next, create a new file `HealthData.js` and add the following code:

// // javascript
// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { BleManager } from "react-native-ble-plx";

// const HealthData = () => {
//   const [heartRate, setHeartRate] = useState(null);
//   const [bloodOxygen, setBloodOxygen] = useState(null);
//   const [respiratoryRate, setRespiratoryRate] = useState(null);
//   const [manager, setManager] = useState(() => {
//     if (Platform.OS === "ios" || Platform.OS === "android") {
//       return new BleManager();
//     }
//     return null;
//   });
//   useEffect(() => {
//     if (!manager) return;

//     const subscription = manager.onStateChange((state) => {
//       if (state === "PoweredOn") {
//         scanAndConnect();
//         subscription.remove();
//       }
//     }, true);
//     return () => subscription.remove();
//   }, []);
//   const scanAndConnect = () => {
//     manager.startDeviceScan(null, null, (error, device) => {
//       if (error) {
//         console.log("Scan error:", error);
//         return;
//       }
//       if (
//         device.name === "YOUR_DEVICE_NAME" ||
//         device.localName === "YOUR_DEVICE_NAME"
//       ) {
//         manager.stopDeviceScan();
//         connectAndSetUp(device);
//       }
//     });
//   };

//   const connectAndSetUp = (device) => {
//     device
//       .connect()
//       .then((device) => {
//         return device.discoverAllServicesAndCharacteristics();
//       })
//       .then((device) => {
//         // Replace 'HEART_RATE_UUID', 'BLOOD_OXYGEN_UUID', and 'RESPIRATORY_RATE_UUID' with the correct UUIDs for your device
//         device.monitorCharacteristicForService(
//           "HEART_RATE_UUID",
//           "HEART_RATE_CHARACTERISTIC_UUID",
//           (error, characteristic) => {
//             if (error) {
//               console.log("Heart rate error:", error);
//               return;
//             }
//             setHeartRate(parseInt(characteristic.value, 16));
//           }
//         );

//         device.monitorCharacteristicForService(
//           "BLOOD_OXYGEN_UUID",
//           "BLOOD_OXYGEN_CHARACTERISTIC_UUID",
//           (error, characteristic) => {
//             if (error) {
//               console.log("Blood oxygen error:", error);
//               return;
//             }
//             setBloodOxygen(parseInt(characteristic.value, 16));
//           }
//         );

//         device.monitorCharacteristicForService(
//           "RESPIRATORY_RATE_UUID",
//           "RESPIRATORY_RATE_CHARACTERISTIC_UUID",
//           (error, characteristic) => {
//             if (error) {
//               console.log("Respiratory rate error:", error);
//               return;
//             }
//             setRespiratoryRate(parseInt(characteristic.value, 16));
//           }
//         );
//       })
//       .catch((error) => {
//         console.log("Connection error:", error);
//       });
//   };

//   return (
//     <View>
//       <Text>Heart Rate: {heartRate}</Text>
//       <Text>Blood Oxygen: {bloodOxygen}</Text>
//       <Text>Respiratory Rate: {respiratoryRate}</Text>
//     </View>
//   );
// };

// export default HealthData;

// // Replace `'YOUR_DEVICE_NAME'` with your wearable device's name and replace the UUIDs with the correct UUIDs for your device.

// // Finally, import and use the `HealthData` component in your app:

// // ```javascript
// // import React from 'react';
// // import { SafeAreaView } from 'react-native';
// // import HealthData from './HealthData';

// // const App = () => {
// //   return (
// //     <SafeAreaView>
// //       <HealthData />
// //     </SafeAreaView>
// //   );
// // };

// // export default App;
// // ```

// // Remember that this code is just a starting point. You'll need to customize it according to your specific device and its documentation.
//javascript
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  FlatList,
} from "react-native";
import { BleManager } from "react-native-ble-plx";
const manager = new BleManager();

const HealthData = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [bloodOxygen, setBloodOxygen] = useState(null);
  const [respiratoryRate, setRespiratoryRate] = useState(null);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === "PoweredOn") {
        scanAndConnect();
        subscription.remove();
      }
    }, true);

    return () => subscription.remove();
  }, []);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error);
        return;
      }

      if (device.isConnected()) {
        setDevices((prevState) => [...prevState, device]);
      }
    });
  };

  const connectToDevice = (device) => {
    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        // Replace 'HEART_RATE_UUID', 'BLOOD_OXYGEN_UUID', and 'RESPIRATORY_RATE_UUID' with the correct UUIDs for your device
        // Replace 'HEART_RATE_CHARACTERISTIC_UUID', 'BLOOD_OXYGEN_CHARACTERISTIC_UUID', and 'RESPIRATORY_RATE_CHARACTERISTIC_UUID' with the correct characteristic UUIDs for your device
        monitorCharacteristic(
          device,
          "HEART_RATE_UUID",
          "HEART_RATE_CHARACTERISTIC_UUID",
          setHeartRate
        );
        monitorCharacteristic(
          device,
          "BLOOD_OXYGEN_UUID",
          "BLOOD_OXYGEN_CHARACTERISTIC_UUID",
          setBloodOxygen
        );
        monitorCharacteristic(
          device,
          "RESPIRATORY_RATE_UUID",
          "RESPIRATORY_RATE_CHARACTERISTIC_UUID",
          setRespiratoryRate
        );
      })
      .catch((error) => {
        console.log("Connection error:", error);
      });
  };

  const monitorCharacteristic = (
    device,
    serviceUUID,
    characteristicUUID,
    setValue
  ) => {
    device.monitorCharacteristicForService(
      serviceUUID,
      characteristicUUID,
      (error, characteristic) => {
        if (error) {
          console.log("Error:", error);
          return;
        }
        setValue(parseInt(characteristic.value, 16));
      }
    );
  };

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("App-Prefs:root=Bluetooth");
    } else {
      Linking.openSettings();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => connectToDevice(item)}>
      <Text>{item.name || item.localName || item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Heart Rate: {heartRate}</Text>
      <Text>Blood Oxygen: {bloodOxygen}</Text>
      <Text>Respiratory Rate: {respiratoryRate}</Text>
      <Text>
        Connected Device:{" "}
        {connectedDevice
          ? connectedDevice.name ||
            connectedDevice.localName ||
            connectedDevice.id
          : "None"}
      </Text>
      <TouchableOpacity onPress={openSettings}>
        <Text>Open Bluetooth Settings</Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HealthData;

// what will happen to my project if i change my react native version from 0.69.1 to 0.63.3 how can i do that? the following is my package.json file
// {
// "name": "my",
// "version": "1.0.0",
// "scripts": {
// "start": "expo start --dev-client",
// "android": "expo run:android",
// "ios": "expo run:ios",
// "web": "expo start --web"
// },
// "dependencies": {
// "@react-native-async-storage/async-storage": "github:react-native-async-storage/async-storage",
// "@react-native-community/datetimepicker": "6.2.0",
// "@react-navigation/bottom-tabs": "^6.4.0",
// "@react-navigation/native": "^6.0.12",
// "@react-navigation/native-stack": "^6.8.0",
// "@react-navigation/stack": "^6.2.3",
// "@types/react": "~18.0.0",
// "@types/react-native": "~0.69.1",
// "expo": "~46.0.9",
// "expo-bluetooth": "^0.0.0",
// "expo-speech": "~10.3.0",
// "expo-splash-screen": "~0.16.2",
// "expo-status-bar": "~1.4.0",
// "expo-updates": "~0.14.7",
// "firebase": "^9.13.0",
// "google-sign-in": "^3.0.3",
// "react": "18.0.0",
// "react-dom": "18.0.0",
// "react-hooks-global-state": "^2.0.0",
// "react-native": "0.69.6",
// "react-native-ble-manager": "^9.0.0",
// "react-native-ble-plx": "^2.0.3",
// "react-native-bluetooth-classic": "^1.60.0-rc.25",
// "react-native-chart-kit": "^6.12.0",
// "react-native-gesture-handler": "~2.5.0",
// "react-native-google-fit": "^0.19.1",
// "react-native-health": "^1.14.0",
// "react-native-healthkit": "^0.0.1",
// "react-native-push-notification": "^8.1.1",
// "react-native-reanimated": "^3.0.2",
// "react-native-safe-area-context": "4.3.1",
// "react-native-screens": "~3.15.0",
// "react-native-svg": "^9.13.3",
// "react-native-tts": "^4.1.0",
// "react-native-web": "~0.18.7",
// "react-native-web-bluetooth": "^0.0.0-alpha.1",
// "react-navigation": "^4.4.4",
// "react-navigation-stack": "^2.10.4",
// "typescript": "^4.6.3",
// "victory-native": "^36.6.8",
// "webpack": "^4.46.0",
// "with-rn-bluetooth-classic": "^1.0.5"
// },
// "devDependencies": {
// "@babel/core": "^7.12.9",
// "@expo/webpack-config": "^0.16.27",
// "webpack-cli": "^4.10.0",
// "webpack-dev-middleware": "^5.3.3",
// "webpack-dev-server": "^3.11.3",
// "webpack-hot-middleware": "^2.25.2"
// },
// "private": true
// }Downgrading your React Native version from 0.69.1 to 0.63.3 may cause compatibility issues with some of the packages in your project. Before downgrading, make sure to check the compatibility of your dependencies with the target React Native version.

// To downgrade React Native, follow these steps:

// 1. Update the "react-native" version in your "dependencies" section in the package.json file:

// ```json
// "react-native": "0.63.3",
// ```

// 2. Update the "@types/react-native" version in your "dependencies" section in the package.json file:

// ```json
// "@types/react-native": "~0.63.3",
// ```

// 3. Delete the "node_modules" folder and any lock files (package-lock.json or yarn.lock) in your project directory.

// 4. Run `npm install` or `yarn` to install the updated dependencies.

// 5. Test your app thoroughly to identify any compatibility issues or breaking changes due to the downgrade. Be prepared to update your code or find alternative packages if needed.

// Remember to backup your project or use a version control system like Git before making these changes, so you can easily revert if necessary.
