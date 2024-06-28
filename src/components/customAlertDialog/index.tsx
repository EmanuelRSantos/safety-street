import {
  Text,
  Center,
  Button,
  ButtonText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogBody,
  Icon,
  AlertDialogFooter,
  HStack,
  CheckCircleIcon,
  AlertCircleIcon,
  Box,
} from "@gluestack-ui/themed";
import React from "react";
import { useNavigation } from "@react-navigation/native";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  successful?: boolean;
  bodyText?: string;
  existing?: boolean;
  error?: boolean;
  navigate?: () => any;
}

const CustomAlertDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  successful,
  bodyText,
  existing,
  error,
  navigate
}) => {

  const navigation = useNavigation() as any;

  return (
    <Center width="$full">
      <AlertDialog closeOnOverlayClick={false} isOpen={isOpen}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            {successful && (
              <HStack space="sm" alignItems="center">
                <Icon as={CheckCircleIcon} color="$success700" />
                <Heading size="lg">Bem vindo!</Heading>
              </HStack>
            )}
            {error && (
              <HStack space="sm" alignItems="center">
                <Icon as={AlertCircleIcon} color="$red700" />
                <Heading size="lg">Ops!</Heading>
              </HStack>
            )}
            {existing && (
              <HStack space="sm" alignItems="center">
                <Icon as={AlertCircleIcon} color="$amber600" />
                <Heading size="lg">Ops!</Heading>
              </HStack>
            )}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="lg">{bodyText}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            {successful && (
              <Button
                bg="$success700"
                action="positive"
                onPress={navigate}
              >
                <ButtonText>Continuar</ButtonText>
              </Button>
            )}
            {error && (
              <Button bg="$error600" action="negative" onPress={onClose}>
                <ButtonText>Tentar Novamente</ButtonText>
              </Button>
            )}
            {existing && (
              <Box>
                <HStack my="$2">
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={onClose}
                    mr="$2"
                  >
                    <ButtonText>Cancelar</ButtonText>
                  </Button>
                  <Button variant="solid" action="secondary" onPress={() => navigation.replace("Login")}>
                    <ButtonText>Login</ButtonText>
                  </Button>
                </HStack>
                <Button
                  variant="solid"
                  bg="$amber600"
                  action="positive"
                  onPress={() => {}}
                >
                  <ButtonText>Trocar senha</ButtonText>
                </Button>
              </Box>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
};

export default CustomAlertDialog;
