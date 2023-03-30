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
