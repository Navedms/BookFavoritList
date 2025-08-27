import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import TextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import useColors from "@hooks/useColors";

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
  placeholderColor = "darkMedium",
  placeholder,
  icon,
  disabled,
  ...otherProps
}: FormFieldProps) {
  const colors = useColors();
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
        placeholderColor={colors[placeholderColor]}
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

export default AppFormField;
