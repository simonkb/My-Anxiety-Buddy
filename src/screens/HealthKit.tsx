import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { useState, useEffect } from "react";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [authorized, setAuthorized] = useState<boolean>(false);
  const fetchData = () => {
    const threeMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const options = {
      startDate: threeMinutesAgo.toISOString(),
      endDate: new Date().toISOString(),
    };
    // let hr = [];
    // let rr = [];
    // let o2 = [];
    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, heartRateResults: HealthValue[]) => {
        /* Heart rate samples are now collected from HealthKit */
        //console.log(heartRateResults, "HR");
        setHeartRate(heartRateResults);
        // hr = heartRateResults;
      }
    );
    AppleHealthKit.getRespiratoryRateSamples(
      options,
      (callbackError: string, respiratoryRateResults: HealthValue[]) => {
        /* Respiratory rate samples are now collected from HealthKit */
        setRespiratoryRate(respiratoryRateResults);
        //rr = respiratoryRateResults;
      }
    );
    AppleHealthKit.getOxygenSaturationSamples(
      options,
      (callbackError: string, oxygenSaturationResults: HealthValue[]) => {
        /* Blood oxygen level samples are now collected from HealthKit */
        setOxygenSaturation(oxygenSaturationResults);
        //o2 = oxygenSaturationResults;
      }
    );
  };
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */
    if (error) {
      Alert.alert("Error", "Access to health data denied. " + error);
    } else {
      setAuthorized(true);
    }
  });
  const avgHeartRate = () => {
    let sum = 0;
    let count = 0;
    if (authorized) {
      fetchData();
      heartRateRange();
      for (let i of heartRate) {
        if (i.value !== 0) {
          sum += i.value;
          count += 1;
        }
      }
      if (sum !== 0) {
        setAvgHR(Math.ceil(sum / count));
      }
    } else {
      alert("Access to health data denied.");
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        /* Called after we receive a response from the system */
        if (error) {
          Alert.alert("Error", "Cannot grant permissions!. " + error);
        } else {
          setAuthorized(true);
          Alert.alert("Access to health data granted.");
        }
      });
    }
  };
  const [hrRange, setHrRange] = useState<String>("");
  const heartRateRange = () => {
    if (authorized) {
      if (heartRate.length > 0) {
        const heartRateValues = heartRate.map((sample) => sample.value);
        const minHR = Math.ceil(Math.min(...heartRateValues));
        const maxHR = Math.ceil(Math.max(...heartRateValues));

        setHrRange(`${minHR} - ${maxHR}`);
      } else {
        setHrRange("-");
      }
    } else {
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        /* Called after we receive a response from the system */
        if (error) {
          Alert.alert(error + " Cannot grant permissions!");
        } else {
          setAuthorized(true);
          Alert.alert("Access to health data granted.");
        }
      });
    }
  };
  const [showHeart, setShowHeart] = useState<boolean>(true);
  const toggleShowHeart = () => {
    if (showHeart) {
      avgHeartRate();
    }
    setShowHeart(!showHeart);
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 5,
      width: showHeart ? 60 : 200,
      height: showHeart ? 60 : 150,
    },
    vitalsContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
    vitalBox: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    vitalLabel: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#777",
    },
    vitalValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#222",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleShowHeart}>
        {showHeart ? (
          <MaterialCommunityIcons name="heart" color="red" size={40} />
        ) : (
          <View style={styles.vitalsContainer}>
            <View style={styles.vitalBox}>
              <Text style={styles.vitalLabel}>Average heart rate: </Text>

              <Text style={styles.vitalValue}>{avgHR}</Text>
            </View>
            <View style={styles.vitalBox}>
              <Text style={styles.vitalLabel}>Heart rate range : </Text>
              <Text style={styles.vitalValue}>{hrRange}</Text>
            </View>
            <View style={styles.vitalBox}>
              <Text style={styles.vitalLabel}>Oxygen level: </Text>
              <Text style={styles.vitalValue}>
                {oxygenSaturation.length > 0 ? oxygenSaturation[0].value : "-"}
              </Text>
            </View>
            <View style={styles.vitalBox}>
              <Text style={styles.vitalLabel}>Respiratory rate: </Text>
              <Text style={styles.vitalValue}>
                {respiratoryRate.length > 0 ? respiratoryRate[0].value : "-"}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default ReadData;
