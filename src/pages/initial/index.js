import { Image, Text, View } from "react-native";
import styles from "./styles";
import Label from "../../components/label";
import { Button, ButtonText } from "@gluestack-ui/themed";

const Initial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ height: "25%", resizeMode: "contain" }}
        source={require("../../../assets/logo.png")}
      />
      <Label
        extraStyle={{ marginBottom: 70 }}
        text={"Safety Street"}
        type={"logo"}
      />
      <Button
        borderRadius="$full"
        h="$12"
        w="80%"
        borderColor="$white"
        variant="outline"
        onPress={() => navigation.navigate("Login")}
      >
        <ButtonText color="$white" fontWeight="$bold" fontSize="$lg">
          Entrar
        </ButtonText>
      </Button>
      <View style={styles.linha}>
        <Text style={styles.linha.label}>ou</Text>
      </View>
      <Button
        borderRadius="$full"
        h="$12"
        w="80%"
        variant="solid"
        backgroundColor="$white"
        onPress={() => navigation.navigate("Register")}
      >
        <ButtonText color="$#072960" fontWeight="$bold" fontSize="$lg">
          Cadastrar
        </ButtonText>
      </Button>
    </View>
  );
};

export default Initial;
