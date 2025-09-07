import GithubIcon from '@mdi/svg/svg/github.svg';
import React from 'react';
import { Col } from '../../components/layout/Col';
import { Container } from '../../components/layout/Container';
import { Row } from '../../components/layout/Row';
import { Spacer } from '../../components/layout/Spacer';
import { IconSize, SVGIcon } from '../../resources/SVGIcon';
import { StyledAppTitle, StyledGithubLoginTrigger } from './StyledComponents';
import { LoadingIndicator } from '../../components/common-features/loading-indicator/LoadingIndicator';
import { useAuthenticationChecks } from './UseAuthenticationChecks';
import { Conditional } from '../../components/Conditional';

const GITHUB_CLIENT_ID = 'Ov23liqq4V5xeipNegiF';

export const LoginPage = () => {
  const { isLoading } = useAuthenticationChecks();

  return (
    <>
      <Container ratio={80} verticalSpacing={80}>
        <Conditional when={isLoading}>
          <LoadingIndicator spinnerSize={IconSize.ExtremelyLarge} />
        </Conditional>
        <Col crossAxisAlignment='center'>
          <StyledAppTitle>Goals Road Maps</StyledAppTitle>
          <Row mainAxisAlignment='center'>
            <StyledGithubLoginTrigger
              onClick={() =>
                window.location.assign(
                  `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_CLIENT_ID}`
                )
              }
            >
              <SVGIcon size={IconSize.Large}>
                <GithubIcon />
              </SVGIcon>
              <Spacer size={8} />
              Login with github
            </StyledGithubLoginTrigger>
          </Row>
        </Col>
      </Container>
    </>
  );
};
