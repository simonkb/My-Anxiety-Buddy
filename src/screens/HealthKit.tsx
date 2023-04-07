import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { useState, useEffect } from "react";
import React from "react";
import { Text, View } from "react-native";

const ReadData: React.FC = () => {
  //Permission options
  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.RespiratoryRate,
        AppleHealthKit.Constants.Permissions.OxygenSaturation,
      ],
    },
  } as HealthKitPermissions;

  const [heartRate, setHeartRate] = useState<HealthValue[]>([]);
  const [respiratoryRate, setRespiratoryRate] = useState<HealthValue[]>([]);
  const [oxygenSaturation, setOxygenSaturation] = useState<HealthValue[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    const fetchData = () => {
      const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
      const options = {
        startDate: threeMinutesAgo.toISOString(),
      };
      AppleHealthKit.getHeartRateSamples(
        options,
        (callbackError: string, heartRateResults: HealthValue[]) => {
          /* Heart rate samples are now collected from HealthKit */
          //console.log(heartRateResults);
          setHeartRate(heartRateResults);
        }
      );
    
      AppleHealthKit.getRespiratoryRateSamples(
        options,
        (callbackError: string, respiratoryRateResults: HealthValue[]) => {
          /* Respiratory rate samples are now collected from HealthKit */
         // console.log(respiratoryRateResults);
          setRespiratoryRate(respiratoryRateResults);
        }
      );
      AppleHealthKit.getOxygenSaturationSamples(
        options,
        (callbackError: string, oxygenSaturationResults: HealthValue[]) => {
          /* Blood oxygen level samples are now collected from HealthKit */
         // console.log(oxygenSaturationResults);
          setOxygenSaturation(oxygenSaturationResults);
        }
      );
    };

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */
      if (error) {
        console.log("[ERROR] Cannot grant permissions!");
      }

      /* Can now read or write to HealthKit */
      fetchData();
      interval = setInterval(fetchData, 1 * 60 * 1000); // fetch data every minute
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>
        Heart Rate: {heartRate.length > 0 ? heartRate[0].value : "-"}
      </Text>
      <Text>
        Respiratory Rate:{" "}
        {respiratoryRate.length > 0 ? respiratoryRate[0].value : "-"}
      </Text>
      <Text>
        Blood Oxygen Level:{" "}
        {oxygenSaturation.length > 0 ? oxygenSaturation[0].value : "-"}
      </Text>
    </View>
  );
};

export default ReadData;
