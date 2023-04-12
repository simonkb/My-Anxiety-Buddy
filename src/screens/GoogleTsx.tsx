import GoogleFit, { Scopes } from "react-native-google-fit";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

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
            setErrorMessage("AUTH_DENIED"+ authResult);
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
    console.log(heartRate)
    
    //setRespiratoryRate(await GoogleFit.getRespiratoryRateSamples(opt));
    setBloodOxygen(await GoogleFit.getOxygenSaturationSamples(opt));
    console.log(bloodOxygen)
  }
  
  return (
    <View>
      {authorized ? (
        <TouchableOpacity onPress={fetchData}>
          <Text>Heart Rate: {heartRate.length > 0 ? heartRate[0].value : "-"}</Text>
          {/* <Text>Respiratory Rate: {respiratoryRate.length > 0 ? respiratoryRate[0].value : "-"}</Text> */}
          <Text>Blood Oxygen: {bloodOxygen.length > 0 ? bloodOxygen[0].value : "-"}</Text>
        </TouchableOpacity>
      ) : (
        <Text>Not authorized</Text>
      )}
    </View>
  );
};

export default ReadDataAndroid;
