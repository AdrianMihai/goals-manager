import styled from '@emotion/styled';
import { FlexColConfiugration, FlexContainerCofiguration, FlexRowConfiguration, SpacerProps } from './Types';
import { css } from '@emotion/react';

export type ContainerPadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type ContainerProps = {
  padding: ContainerPadding;
  ratio: number;
};

export const StyledBox = styled.div<ContainerProps>`
  margin: 0px auto;
  padding-top: ${({ padding }) => padding.top}px;
  padding-bottom: ${({ padding }) => padding.bottom}px;
  padding-right: ${({ padding }) => padding.right}px;
  padding-left: ${({ padding }) => padding.left}px;
  width: ${({ ratio }) => ratio}%;
  box-sizing: border-box;
`;

export const StyledBasicSpacer = styled.div<SpacerProps>`
  display: inline-block;
  width: ${({ size }) => size}px;
  background: transparent;
`;

const AlignmentValues = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  evenly: 'space-evenly',
  grouped: 'space-around',
};

const flexContainerStyles = (props: FlexContainerCofiguration) => css`
  justify-content: ${AlignmentValues[props.mainAxisAlignment]};
  align-items: ${AlignmentValues[props.crossAxisAlignment]};
`;

export const StyledRow = styled.div<FlexContainerCofiguration & FlexRowConfiguration>`
  display: flex;
  flex-direction: row;
  height: ${({ stretchToFullHeight }) => (stretchToFullHeight ? '100%' : 'auto')};
  ${flexContainerStyles}
`;

export const StyledCol = styled.div<FlexContainerCofiguration & FlexColConfiugration>`
  display: flex;
  flex-direction: column;
  width: ${({ stretchToFullWidth }) => (stretchToFullWidth ? '100%' : 'auto')};
  ${flexContainerStyles}
`;
