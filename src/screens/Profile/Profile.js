import { NavigationContainer } from "@react-navigation/native";
import ProfileStack from "../../routes/profileStack";
import { View, Text } from "react-native";

const Profile = () => {
  return (
    <NavigationContainer independent={true}>
      <ProfileStack />
    </NavigationContainer>
  );
};

export default Profile;
