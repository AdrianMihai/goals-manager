import React from 'react';
import { Button } from '../../buttons/Button';
import { Container } from '../../layout/Container';
import GithubIcon from '@mdi/svg/svg/github.svg';
import { SVGIcon } from '../../../resources/SVGIcon';
import { Spacer } from '../../layout/Spacer';
import { StyledAppTitle } from './StyledComponents';
import { Col } from '../../layout/Col';
import { Row } from '../../layout/Row';

const GITHUB_CLIENT_ID = 'Ov23liqq4V5xeipNegiF';

export const LoginPage = () => {
  return (
    <Container ratio={80} verticalSpacing={80}>
      <Col crossAxisAlignment='center'>
        <StyledAppTitle>Goals Road Maps</StyledAppTitle>
        <Row mainAxisAlignment='center'>
          <Button
            onClick={() =>
              window.location.assign(
                `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_CLIENT_ID}`
              )
            }
          >
            <SVGIcon>
              <GithubIcon />
            </SVGIcon>
            <Spacer size={8} />
            Login with github
          </Button>
        </Row>
      </Col>
    </Container>
  );
};
