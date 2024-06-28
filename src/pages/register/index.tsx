import React, { useState } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import Label from "../../components/label";
import {
  Center,
  Button,
  ButtonText,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../../services/user.service";
import CustomAlertDialog from "../../components/customAlertDialog";
import CustomFormControl from "../../components/customFormControl";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormDataProps = {
  name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  last_name: yup.string().required("Informe o sobrenome"),
  username: yup
    .string()
    .required("Informe o usuário")
    .min(6, "Deve conter pelo menos 6 digitos"),
  email: yup.string().required("Informe o E-mail").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
  password_confirm: yup
    .string()
    .required("Informe a confirmação de senha")
    .oneOf([yup.ref("password"), null], "As senhas não são iguais"),
});

const Register = ({ navigation }) => {
  const [errorAlertDialog, setErrorAlertDialog] = useState(false);
  const [warningAlertDialog, setWarningAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let uid: string;

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
      extra_datas: {
        name: data.name,
        last_name: data.last_name,
        username: data.username,
      },
    };
    setIsLoading(true);

    return await createUser(datas)
      .then( async (result) => {
        uid = await result.uid;
        if (result.message === "E-mail já cadastrado!") {
          setWarningAlertDialog(true);
          setIsLoading(false);
        } else if (
          result.message ===
          "Não foi possível cadastrar o usuário, tente novamente mais tarde!"
        ) {
          setErrorAlertDialog(true);
          setIsLoading(false);
        } else if (result.message === "Usuário cadastrado com sucesso!") {
          saveData(data.username).then((result) => {
            if (result === "Success") {
              navigation.navigate("UserImage", {uid: uid});
              setIsLoading(false);
            } else {
              console.log("error");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorAlertDialog(true);
        setIsLoading(false);
      });
  };

  const saveData = async (value: string) => {
    try {
      await AsyncStorage.setItem("user-username", value);
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
          text={"CADASTRO"}
          extraStyle={{ alignSelf: "center", position: "absolute" }}
        />
      </View>
      <ScrollView>
        <Center my="auto">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <CustomFormControl
                name="Nome"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="last_name"
            render={({ field: { onChange } }) => (
              <CustomFormControl
                name="Último nome"
                onChangeText={onChange}
                errorMessage={errors.last_name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange } }) => (
              <CustomFormControl
                name="Nome de usuário"
                onChangeText={onChange}
                errorMessage={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <CustomFormControl
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
                name="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <CustomFormControl
                password
                name="Confirme a senha"
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />
          <Button
            borderRadius="$full"
            h="$12"
            w="80%"
            variant="solid"
            backgroundColor="$white"
            mb="$6"
            onPress={!isLoading ? handleSubmit(handleSignUp) : () => {}}
          >
            {isLoading ? (
              <ButtonSpinner color="$#072960" size="large" mr="$1" />
            ) : (
              <ButtonText color="$#072960" fontWeight="$bold" fontSize="$lg">
                Cadastrar
              </ButtonText>
            )}
          </Button>
          <CustomAlertDialog
            existing
            bodyText="Espere ai! Parece que você já está cadastrado. Deseja fazer login ou recuperar sua conta?"
            isOpen={warningAlertDialog}
            onClose={() => setWarningAlertDialog(false)}
          />
          <CustomAlertDialog
            error
            bodyText="Ocorreu um erro interno. É nossa culpa, não se preocupe! Tente novamente mais tarde."
            isOpen={errorAlertDialog}
            onClose={() => setErrorAlertDialog(false)}
          />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
