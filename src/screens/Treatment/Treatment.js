import { NavigationContainer } from "@react-navigation/native";
import TreatmentStack from "../../routes/treatmentStack";

const Treatment = () => {
  return (
    <NavigationContainer independent={true}>
      <TreatmentStack />
    </NavigationContainer>
  );
};

export default Treatment;
