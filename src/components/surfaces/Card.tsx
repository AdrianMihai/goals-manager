import React from 'react';
import { StyledCard } from './StyledComponents';
import { Col } from '../layout/Col';
import { Row } from '../layout/Row';

export const Card = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledCard verticalSpacing={16} horizontalSpacing={8}>
      <Row stretchToFullHeight>
        <Col stretchToFullWidth mainAxisAlignment='center'>
          {children}
        </Col>
      </Row>
    </StyledCard>
  );
};
