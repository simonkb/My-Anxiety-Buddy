import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Geolocation from "@react-native-community/geolocation";

export default function CurrentLocationDisplay() {
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
        )
          .then((response) => response.json())
          .then((json) => {
            const addressComponents = json.results[0].address_components;
            const formattedAddress = addressComponents
              .map((component) => component.long_name)
              .join(", ");

            setLocation(formattedAddress);
          })
          .catch((error) => console.error(error));
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View>
      <Button title="Get current location" onPress={handleGetLocation} />
      {location && <Text>{location}</Text>}
    </View>
  );
}
