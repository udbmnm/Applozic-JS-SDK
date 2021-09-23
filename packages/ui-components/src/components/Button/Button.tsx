import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

export interface ButtonProps extends Omit<ChakraButtonProps, "children"> {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Button contents
   */
  label: string;
}

const Button = ({ label, ...rest }: ButtonProps) => {
  return <ChakraButton {...rest}>{label}</ChakraButton>;
};

export default Button;
