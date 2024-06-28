import {
  FormControl,
  Box,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  FormControlHelper,
  FormControlHelperText,
  AlertCircleIcon,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
  InputIcon,
} from "@gluestack-ui/themed";
import { useState } from "react";

interface Props {
  message?: string;
  errorMessage?: string | null;
  password?: boolean;
  name?: string;
  onChangeText?: (text: string) => void;
  isRequired?: boolean;
}

const CustomFormControl: React.FC<Props> = ({
  errorMessage = null,
  name,
  password,
  message,
  onChangeText,
  isRequired = true,
}) => {
  const [handleState, setHandleState] = useState(true);

  return (
    <Box mb="$5" w="80%">
      <FormControl size="lg" isInvalid={!!errorMessage} isRequired={isRequired}>
        <FormControlLabel mb="$1">
          <FormControlLabelText fontFamily="Poppins_500Medium" color="white">{name}</FormControlLabelText>
        </FormControlLabel>
        <Input alignItems="center">
          {!password && (
            <InputField
              color="$white"
              onChangeText={onChangeText}
              type="text"
            />
          )}
          {password && (
            <InputField
              color="$white"
              onChangeText={onChangeText}
              type={handleState ? "password" : "text"}
            />
          )}
          {password && (
            <InputSlot pr="$3" onPress={() => setHandleState(!handleState)}>
              <InputIcon
                as={handleState ? EyeOffIcon : EyeIcon}
                color="white"
                size="xl"
              />
            </InputSlot>
          )}
        </Input>
        {message && (
          <FormControlHelper>
            <FormControlHelperText>{message}</FormControlHelperText>
          </FormControlHelper>
        )}
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{errorMessage}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </Box>
  );
};

export default CustomFormControl;
