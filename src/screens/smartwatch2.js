import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import BleManager from "react-native-ble-manager";

// Define the heart rate service and characteristic UUIDs
const HR_SERVICE_UUID = "180D";
const HR_CHARACTERISTIC_UUID = "2A37";

const HeartRateMonitor = () => {
  const [heartRate, setHeartRate] = useState(null);
  BleManager.start({ showAlert: false }).then(() => {
    // Success code
    console.log("Module initialized");
  });
  useEffect(() => {
    // Scan for BLE devices that support the heart rate service
    BleManager.startDeviceScan([HR_SERVICE_UUID], null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      // Connect to the selected device
      BleManager.connectToDevice(device.id).then(() => {
        // Discover the available services and characteristics
        BleManager.discoverAllServicesAndCharacteristicsForDevice(
          device.id
        ).then(() => {
          // Subscribe to the heart rate characteristic
          BleManager.startNotification(
            device.id,
            HR_SERVICE_UUID,
            HR_CHARACTERISTIC_UUID
          ).then(() => {
            console.log("Subscribed to heart rate characteristic");

            // Parse the received heart rate data
            BleManager.onCharacteristicValueChanged(
              device.id,
              HR_SERVICE_UUID,
              HR_CHARACTERISTIC_UUID,
              (error, data) => {
                if (error) {
                  console.error(error);
                  return;
                }

                // Parse the received data and extract the heart rate value
                const heartRateValue = data.readInt8(1);
                setHeartRate(heartRateValue);
              }
            );
          });
        });
      });
    });

    // Disconnect from the device and stop the scan when the component unmounts
    return () => {
      BleManager.disconnectAll();
      BleManager.stopDeviceScan();
    };
  }, []);

  return (
    <View>
      {heartRate !== null ? (
        <Text>Heart rate: {heartRate}</Text>
      ) : (
        <Text>Connecting...</Text>
      )}
    </View>
  );
};

export default HeartRateMonitor;
