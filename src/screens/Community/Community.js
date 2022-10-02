import { NavigationContainer } from "@react-navigation/native";
import CommunityStack from "../../routes/communityStack";

const Community = () => {
  return (
    <NavigationContainer independent={true}>
      <CommunityStack />
    </NavigationContainer>
  );
};

export default Community;
