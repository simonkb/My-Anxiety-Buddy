import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { useState, useEffect } from "react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  const [avgHR, setAvgHR] = useState<number>(0);
  const [authorized, setAuthorized] = useState<boolean>(false)
    const fetchData = () => {
      const threeMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const options = {
        startDate: threeMinutesAgo.toISOString(),
        endDate: new Date().toISOString(),
      };
      let hr = [];
      let rr = []
      let o2 = []
      AppleHealthKit.getHeartRateSamples(
        options,
        (callbackError: string, heartRateResults: HealthValue[]) => {
          /* Heart rate samples are now collected from HealthKit */
          console.log(heartRateResults, "HR");
          setHeartRate(heartRateResults);
          hr = heartRateResults
        }
      );
      AppleHealthKit.getRespiratoryRateSamples(
        options,
        (callbackError: string, respiratoryRateResults: HealthValue[]) => {
          /* Respiratory rate samples are now collected from HealthKit */
         // console.log(respiratoryRateResults);
          setRespiratoryRate(respiratoryRateResults);
          rr = respiratoryRateResults
        }
      );
      AppleHealthKit.getOxygenSaturationSamples(
        options,
        (callbackError: string, oxygenSaturationResults: HealthValue[]) => {
          /* Blood oxygen level samples are now collected from HealthKit */
          //console.log(oxygenSaturationResults);
          setOxygenSaturation(oxygenSaturationResults);
          o2 = oxygenSaturationResults
        }
      );
      
    };
    
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */
      if (error) {
        console.log("[ERROR] Cannot grant permissions!");
      }else{
        setAuthorized(true)
      }
    });

  const avgHeartRate = () => {
    let sum = 0;
    let count = 0;
    if (authorized){
      fetchData();
      heartRateRange();
      for (let i of heartRate) {
        if (i.value !== 0) {
          sum += i.value;
          count += 1;
        }
      }
      if(sum !==0){
        setAvgHR(Math.ceil(sum / count));
      }
    }else{
      console.log("Not authorized")
    }
  };
  const [hrRange, setHrRange] = useState<String>("");
  const heartRateRange = () => {
    if (authorized) {
      if (heartRate.length > 0) {
        const heartRateValues = heartRate.map((sample) => sample.value);
        const minHR = Math.min(...heartRateValues);
        const maxHR = Math.max(...heartRateValues);

        setHrRange(`${minHR} - ${maxHR}`);
      } else {
        setHrRange("No data available for the last 10 minutes");
      }
    } else {
      console.log("Not authorized");
    }
  }
  

  return (
    <View>
      <TouchableOpacity onPress={() => avgHeartRate()
      
      }>
        <Text>Heart Rate Average: {avgHR}</Text>
        <Text>Heart Rate Range: {hrRange}</Text>

        <Text>
          Respiratory Rate:{" "}
          {respiratoryRate.length > 0 ? respiratoryRate[0].value : "-"}
        </Text>
        <Text>
          Blood Oxygen Level:{" "}
          {oxygenSaturation.length > 0 ? oxygenSaturation[0].value : "-"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadData;
