import React, { useCallback, useState } from 'react';
import ArrowRightIcon from '@mdi/svg/svg/chevron-right-box-outline.svg';
import { StyledSubGoalConfirmButton, StyledSubGoalInput } from './StyledComponents';
import { SVGIcon } from '../../../resources/SVGIcon';
import { Field, FocusTrap } from '@ark-ui/react';
import { StyledDecoratedTextInputWrapper } from '../../fields/StyledComponents';

export const SubGoalCreator = ({ onGoalAdd }) => {
  const [subGoalText, setGoalText] = useState('');

  const onTextChange = useCallback((ev) => setGoalText(ev.target.value), []);
  const onConfirm = useCallback(() => {
    onGoalAdd(subGoalText);
  }, [subGoalText, onGoalAdd]);

  return (
    <FocusTrap disabled={false}>
      <StyledSubGoalInput>
        <StyledDecoratedTextInputWrapper>
          <Field.Input placeholder='Set sub-goal' value={subGoalText} onChange={onTextChange} />
          <StyledSubGoalConfirmButton onClick={onConfirm}>
            <SVGIcon>
              <ArrowRightIcon />
            </SVGIcon>
          </StyledSubGoalConfirmButton>
        </StyledDecoratedTextInputWrapper>
      </StyledSubGoalInput>
    </FocusTrap>
  );
};
