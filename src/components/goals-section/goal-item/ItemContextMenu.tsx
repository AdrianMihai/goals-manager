import React, { useContext } from 'react';
import { Menu } from '@ark-ui/react';
import { Button } from '../../buttons/Button';
import { SVGIcon } from '../../../resources/SVGIcon';
import DotsVertical from '@mdi/svg/svg/dots-vertical.svg';
import Bin from '@mdi/svg/svg/delete.svg';
import { Spacer } from '../../layout/Spacer';
import { StyledGoalItemButton } from './StyledComponents';
import { StyledContextMenuContent } from '../../surfaces/StyledComponents';
import { GoalItemContext } from './GoalItemContext';
import Pencil from '@mdi/svg/svg/pencil.svg';
import PencilOff from '@mdi/svg/svg/pencil-off.svg';
import { GoalsStore } from '../../../stores/GoalsStore';

export const ItemContextMenu = () => {
  const { goalData, isEditingActive, enableEditMode, disableEditMode } = useContext(GoalItemContext);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button>
          <SVGIcon>
            <DotsVertical />
          </SVGIcon>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <StyledContextMenuContent verticalSpacing={6} horizontalSpacing={4}>
            <Menu.Item value='delete'>
              <StyledGoalItemButton onClick={isEditingActive ? disableEditMode : enableEditMode}>
                <SVGIcon>{isEditingActive ? <PencilOff /> : <Pencil />}</SVGIcon>
                <Spacer size={10} />
                <span>{isEditingActive ? 'Stop Editing' : 'Edit'}</span>
              </StyledGoalItemButton>
            </Menu.Item>
            <Menu.Item value='delete'>
              <StyledGoalItemButton
                onClick={() => GoalsStore.dispatchAction(GoalsStore.events.deleteGoal, { goalId: goalData.id })}
              >
                <SVGIcon>
                  <Bin />
                </SVGIcon>
                <Spacer size={10} />
                <span>Delete</span>
              </StyledGoalItemButton>
            </Menu.Item>
          </StyledContextMenuContent>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
