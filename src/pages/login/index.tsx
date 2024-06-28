import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import CustomFormControl from "../../components/customFormControl";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Label from "../../components/label";
import { loginUser } from "../../services/user.service";
import {
  ScrollView,
  Button,
  ButtonText,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import CustomAlertDialog from "../../components/customAlertDialog";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormDataProps = {
  email: string;
  password: string;
};

const signUpSchema = yup.object({
  email: yup.string().required("Informe o E-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha"),
});

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlertDialog, setErrorAlertDialog] = useState(false);
  const [tooManyRequests, setTooManyRequests] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema) as any,
  });

  const handleSignUp = async (data: FormDataProps) => {
    const datas = {
      email: data.email,
      password: data.password,
    };
    setIsLoading(true);

    return await loginUser(datas)
      .then(async (result) => {
        if (result.message === "Sucesso") {
          if (!result.image) {
            navigation.navigate("UserImage", {
              newImage: true,
              uid: result.uid,
            });
          } else {
            await saveData(result.username, result.image);
            navigation.reset({
              index: 0,
              routes: [{ name: "Feed" }],
            });
            setIsLoading(false);
          }
        } else if (result.errorCode === "auth/invalid-credential") {
          setErrorAlertDialog(true);
          setIsLoading(false);
        } else if (result.errorCode === "auth/too-many-requests") {
          setTooManyRequests(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveData = async (username: string, image: string) => {
    try {
      await AsyncStorage.setItem("user-username", username);
      await AsyncStorage.setItem("user-image", image);
      await AsyncStorage.setItem("is-logged", JSON.stringify(true));
      return "Success";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 8,
        }}
      >
        <TouchableOpacity>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            color={"#fff"}
            size={32}
          />
        </TouchableOpacity>
        <Label
          type={"primary"}
          text={"LOGIN"}
          extraStyle={{ alignSelf: "center", position: "absolute" }}
        />
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Image
            style={{ width: 200, height: 200, marginTop: 15 }}
            source={require("../../../assets/logo.png")}
          />
        </View>
        <View style={styles.inputs}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <CustomFormControl
                isRequired={false}
                name="E-mail"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <CustomFormControl
                password
                isRequired={false}
                name="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </View>
        <View style={styles.rowContent}>
          <TouchableOpacity>
            <Text style={styles.rowContent.labels}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <Button
            borderRadius="$full"
            h="$12"
            w="80%"
            variant="solid"
            backgroundColor="$white"
            isDisabled={!isValid}
            onPress={!isLoading ? handleSubmit(handleSignUp) : () => {}}
          >
            {isLoading ? (
              <ButtonSpinner color="$#072960" size="large" mr="$1" />
            ) : (
              <ButtonText color="$#072960" fontWeight="$bold" fontSize="$lg">
                Entrar
              </ButtonText>
            )}
          </Button>
          <View style={styles.linha}>
            <Text style={styles.lineLabel}>ou</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <TouchableOpacity>
              <Icon name="logo-facebook" size={35} style={{ color: "white" }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="logo-google" size={35} style={{ color: "white" }} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {errorAlertDialog && (
        <CustomAlertDialog
          error
          bodyText="E-mail e/ou senha incorretos. Tente novamente!"
          isOpen={errorAlertDialog}
          onClose={() => setErrorAlertDialog(false)}
        />
      )}
      {tooManyRequests && (
        <CustomAlertDialog
          error
          bodyText="Muitas tentativas de login, sua conta foi temporariamente bloqueada."
          isOpen={tooManyRequests}
          onClose={() => setTooManyRequests(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default Login;
