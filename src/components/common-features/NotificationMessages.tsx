import { createToaster, Toast, Toaster } from '@ark-ui/react';
import React, { useEffect } from 'react';
import { StyledCloseButton, StyledMessageContainer } from './StyledComponents';
import { SVGIcon } from '../../resources/SVGIcon';
import Close from '@mdi/svg/svg/window-close.svg';
import { Container } from '../layout/Container';
import { Row } from '../layout/Row';
import { Spacer } from '../layout/Spacer';
import { AppEvents, AppMediator } from '../../events/AppMediator';

export const toaster = createToaster({
  placement: 'top-end',
  overlap: true,
  gap: 24,
});

export const NotificationMessages = () => {
  useEffect(() => {
    const onMessageDisplay = AppMediator.subscribe(AppEvents.showNotificationMessage, (options) =>
      toaster.create(options)
    );

    return () => onMessageDisplay.unsubscribe();
  }, []);

  return (
    <Toaster toaster={toaster}>
      {(toast) => (
        <StyledMessageContainer key={`notification-message-${toast.id}`} id={toast.id}>
          <Container verticalSpacing={10} horizontalSpacing={5}>
            <Row crossAxisAlignment='center'>
              <Toast.Title>{toast.title}</Toast.Title>
              <Spacer size={10} />
              <Toast.CloseTrigger asChild>
                <StyledCloseButton>
                  <SVGIcon>
                    <Close />
                  </SVGIcon>
                </StyledCloseButton>
              </Toast.CloseTrigger>
            </Row>
          </Container>
        </StyledMessageContainer>
      )}
    </Toaster>
  );
};
