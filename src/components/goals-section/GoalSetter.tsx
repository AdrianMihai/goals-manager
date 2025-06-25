import { Field } from '@ark-ui/react';
import { Row } from '../layout/Row';
import React, { useCallback, useContext, useState } from 'react';
import { IconSize, SVGIcon } from '../../resources/SVGIcon';
import TrackChangesOutlinedIcon from '@mdi/svg/svg/radar.svg';
import { Spacer } from '../layout/Spacer';
import { StyledField, StyledPrimaryButton } from './StyledComponents';
import { GoalsListContext } from './GoalsListContext';

export const GoalSetter = () => {
  const [goalText, setGoalText] = useState('');
  const { addGoal } = useContext(GoalsListContext);

  const onGoalAdd = useCallback(() => {
    addGoal(goalText);
    setGoalText('');
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
