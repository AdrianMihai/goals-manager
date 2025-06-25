import React from "react";
import { ButtonProps } from "./Types";
import { StyledButton } from "./StyledComponents";

export const Button = ({ children, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
