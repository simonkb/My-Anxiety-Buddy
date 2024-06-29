import GoogleFit, { Scopes } from "react-native-google-fit";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ReadDataAndroid = () => {
  const [authorized, setAuthorized] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [heartRate, setHeartRate] = useState([{ value: 0 }]);
  const [respiratoryRate, setRespiratoryRate] = useState([{ value: 0 }]);
  const [bloodOxygen, setBloodOxygen] = useState([{ value: 0 }]);

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
    ],
  };

  useEffect(() => {
    GoogleFit.checkIsAuthorized();
    if (GoogleFit.isAuthorized) {
      setAuthorized(true);
      fetchData();
    } else {
      GoogleFit.authorize(options)
        .then((authResult) => {
          if (authResult.success) {
            console.log("AUTH_SUCCESS", authResult);
            setAuthorized(true);
            fetchData();
          } else {
            setErrorMessage("AUTH_DENIED" + authResult);
            console.log("AUTH_DENIED", authResult);
          }
        })
        .catch((error) => {
          setErrorMessage("AUTH_ERROR " + error);
          console.log("AUTH_ERROR ", error);
        });
    }
  }, []);

  const opt = {
    startDate: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // fetch data of last 10 minutes
    endDate: new Date().toISOString(), // required
    bucketInterval: 1, // optional - default 1.
  };

  async function fetchData() {
    setHeartRate(await GoogleFit.getHeartRateSamples(opt));
    console.log(heartRate);

    //setRespiratoryRate(await GoogleFit.getRespiratoryRateSamples(opt));
    setBloodOxygen(await GoogleFit.getOxygenSaturationSamples(opt));
    //console.log(bloodOxygen);
  }

  const [avgHR, setAvgHR] = useState<number>(0);

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
      console.log("Not authorized");
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
      console.log("Not authorized");
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

              <Text style={styles.vitalValue}>{avgHR > 0 ? avgHR : "-"}</Text>
            </View>
            <View style={styles.vitalBox}>
              <Text style={styles.vitalLabel}>Heart rate range : </Text>
              <Text style={styles.vitalValue}>{hrRange}</Text>
            </View>
            <View style={styles.vitalBox}>
              <Text style={styles.vitalLabel}>Oxygen level: </Text>
              <Text style={styles.vitalValue}>
                {bloodOxygen.length > 0 ? bloodOxygen[0].value : "-"}
              </Text>
            </View>
            <View style={styles.vitalBox}>
              <Text style={styles.vitalLabel}>Respiratory rate: </Text>
              <Text style={styles.vitalValue}>
                {respiratoryRate.length > 0 ? "-" : "-"}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ReadDataAndroid;
