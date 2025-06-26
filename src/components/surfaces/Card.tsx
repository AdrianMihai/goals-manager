import React from 'react';
import { StyledCard } from './StyledComponents';
import { Col } from '../layout/Col';
import { Row } from '../layout/Row';

type CardProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Card = ({ children, ...rest }: CardProps) => {
  return (
    <StyledCard verticalSpacing={16} horizontalSpacing={8} {...rest}>
      <Row stretchToFullHeight>
        <Col stretchToFullWidth mainAxisAlignment='center'>
          {children}
        </Col>
      </Row>
    </StyledCard>
  );
};
