import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import TextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import colors from "@config/colors";

interface FormFieldProps {
  firstValue?: unknown;
  name: string;
  width?: string;
  backgroundColor?: string;
  icon?: string;
  border?: number;
  style?: Object;
  textStyle?: Object;
  onChangeCallBack?: (name: string, text: string) => void;
  placeholder?: string;
  placeholderColor?: string;
  maxLength?: number;
  multiline?: boolean;
  disabled?: boolean;
  pointerEvents?: string;
  onRemoveValue?: () => void;
}

function AppFormField({
  firstValue,
  name,
  width,
  backgroundColor,
  border = 1,
  style,
  textStyle,
  onChangeCallBack,
  onRemoveValue,
  placeholderColor = colors.darkMedium,
  placeholder,
  icon,
  disabled,
  ...otherProps
}: FormFieldProps) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const handleFirstValue = (firstValue: unknown) => {
    setFieldValue(name, firstValue);
  };

  const handleOnChangeText = (text: string) => {
    onChangeCallBack && onChangeCallBack(name, text);
    setFieldValue(name, text);
  };

  useEffect(() => {
    handleFirstValue(firstValue);
  }, [firstValue]);

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleOnChangeText}
        value={values[name]}
        width={width}
        backgroundColor={backgroundColor}
        border={border}
        style={style}
        textStyle={textStyle}
        placeholderColor={placeholderColor}
        placeholder={placeholder}
        icon={icon}
        disabled={disabled}
        onRemoveValue={onRemoveValue}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numbersControl: {
    paddingHorizontal: 8,
    marginTop: -8,
  },
});

export default AppFormField;
