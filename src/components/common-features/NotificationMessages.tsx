import { createToaster, Toast, Toaster } from '@ark-ui/react';
import React, { useCallback, useEffect } from 'react';
import { StyledCloseButton, StyledMessageContainer } from './StyledComponents';
import { SVGIcon } from '../../resources/SVGIcon';
import Close from '@mdi/svg/svg/window-close.svg';
import { Container } from '../layout/Container';
import { Row } from '../layout/Row';
import { Spacer } from '../layout/Spacer';
import { AppEvents, AppMediator } from '../../events/AppMediator';
import { Conditional } from '../Conditional';
import { isNullOrUndefined } from '../../utils/ObjectUtils';
import { Button } from '../buttons/Button';

export const toaster = createToaster({
  placement: 'top-end',
  overlap: true,
  gap: 24,
});

export const NotificationMessages = () => {
  useEffect(() => {
    const parseOptions = (options) => ({
      ...options,
      action:
        !options.id || !options.action
          ? undefined
          : {
              label: options.action,
              onClick: () => AppMediator.publish(AppEvents.notificationActionTriggered, { messageId: options.id }),
            },
    });

    const onMessageDisplay = AppMediator.subscribe(AppEvents.showNotificationMessage, (options) =>
      toaster.create(parseOptions(options))
    );

    return () => onMessageDisplay.unsubscribe();
  }, []);

  return (
    <Toaster toaster={toaster}>
      {(toast) => (
        <StyledMessageContainer key={`notification-message-${toast.id}`} id={toast.id}>
          <Container verticalSpacing={10} horizontalSpacing={5}>
            <Row crossAxisAlignment='center'>
              <Conditional when={!isNullOrUndefined(toast.action)}>
                <Toast.Title>{toast.title}</Toast.Title>
                <Spacer size={10} />
                <Button onClick={toast.action?.onClick}>{toast.action?.label}</Button>
              </Conditional>
              <Conditional when={isNullOrUndefined(toast.action)}>
                <Toast.Title>{toast.title}</Toast.Title>
              </Conditional>

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
