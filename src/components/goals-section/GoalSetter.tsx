import { Field } from '@ark-ui/react';
import TrackChangesOutlinedIcon from '@mdi/svg/svg/radar.svg';
import React, { useCallback, useContext, useState } from 'react';
import { AppEvents, AppMediator } from '../../events/AppMediator';
import { IconSize, SVGIcon } from '../../resources/SVGIcon';
import { isEmptyString } from '../../utils/StringUtils';
import { Row } from '../layout/Row';
import { Spacer } from '../layout/Spacer';
import { GoalsListContext } from './GoalsListContext';
import { StyledField, StyledPrimaryButton } from './StyledComponents';

export const GoalSetter = () => {
  const [goalText, setGoalText] = useState('');
  const { addGoal } = useContext(GoalsListContext);

  const onGoalAdd = useCallback(() => {
    if (isEmptyString(goalText)) {
      AppMediator.publish(AppEvents.showNotificationMessage, {
        title: 'Cannot add empty goal',
        type: 'error',
        duration: 4000,
      });

      return;
    }

    addGoal(goalText);
    setGoalText('');
    AppMediator.publish(AppEvents.showNotificationMessage, {
      title: 'Goal successfully added',
      type: 'success',
      duration: 5000,
    });
  }, [addGoal, goalText]);

  return (
    <Row crossAxisAlignment='center'>
      <StyledField>
        <Field.Input
          placeholder='Enter your new goal'
          value={goalText}
          onChange={(ev) => setGoalText(ev.target.value)}
        />
      </StyledField>
      <StyledPrimaryButton onClick={onGoalAdd}>
        <SVGIcon size={IconSize.Large}>
          <TrackChangesOutlinedIcon />
        </SVGIcon>
        <Spacer size={8} />
        <span>Add Goal</span>
      </StyledPrimaryButton>
    </Row>
  );
};
