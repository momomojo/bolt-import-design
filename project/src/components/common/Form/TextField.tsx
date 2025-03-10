import React from 'react';
import {
  Input,
  FormControl,
  IInputProps,
  IFormControlProps,
  IFormControlHelperTextProps,
  IFormControlErrorMessageProps,
  IFormControlLabelProps,
} from 'native-base';

export interface TextFieldProps extends IInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  formControlProps?: IFormControlProps;
  helperTextProps?: IFormControlHelperTextProps;
  errorMessageProps?: IFormControlErrorMessageProps;
  labelProps?: IFormControlLabelProps;
}

/**
 * TextField component that combines NativeBase Input with FormControl
 * for consistent form styling and validation
 */
export const TextField = ({
  label,
  helperText,
  error,
  isRequired,
  formControlProps,
  helperTextProps,
  errorMessageProps,
  labelProps,
  ...props
}: TextFieldProps) => {
  const isInvalid = !!error;

  return (
    <FormControl
      isInvalid={isInvalid}
      isRequired={isRequired}
      {...formControlProps}
    >
      {label && <FormControl.Label {...labelProps}>{label}</FormControl.Label>}

      <Input variant="outline" {...props} />

      {helperText && !isInvalid && (
        <FormControl.HelperText {...helperTextProps}>
          {helperText}
        </FormControl.HelperText>
      )}

      {error && (
        <FormControl.ErrorMessage {...errorMessageProps}>
          {error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default TextField;
