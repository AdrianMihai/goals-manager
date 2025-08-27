import GithubIcon from '@mdi/svg/svg/github.svg';
import React from 'react';
import { Navigate, useSearchParams } from 'react-router';
import { Button } from '../../components/buttons/Button';
import { Conditional } from '../../components/Conditional';
import { Col } from '../../components/layout/Col';
import { Container } from '../../components/layout/Container';
import { Row } from '../../components/layout/Row';
import { Spacer } from '../../components/layout/Spacer';
import { SVGIcon } from '../../resources/SVGIcon';
import { isNullOrUndefined } from '../../utils/ObjectUtils';
import { StyledAppTitle } from './StyledComponents';

const GITHUB_CLIENT_ID = 'Ov23liqq4V5xeipNegiF';

export const LoginPage = () => {
  const [queryParams] = useSearchParams();

  console.log(queryParams);

  return (
    <>
      <Conditional when={!isNullOrUndefined(queryParams.get('code'))}>
        <Navigate to='/goals' />
      </Conditional>
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
    </>
  );
};
