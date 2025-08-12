import { Menu } from '@ark-ui/react';
import Bin from '@mdi/svg/svg/delete.svg';
import DotsVertical from '@mdi/svg/svg/dots-vertical.svg';
import PencilOff from '@mdi/svg/svg/pencil-off.svg';
import Pencil from '@mdi/svg/svg/pencil.svg';
import React, { useContext } from 'react';
import { AppEvents, AppMediator } from '../../../events/AppMediator';
import { SVGIcon } from '../../../resources/SVGIcon';
import { Button } from '../../buttons/Button';
import { Spacer } from '../../layout/Spacer';
import { StyledContextMenuContent } from '../../surfaces/StyledComponents';
import { GoalItemContext } from './GoalItemContext';
import { StyledGoalItemButton } from './StyledComponents';

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
              <StyledGoalItemButton onClick={() => AppMediator.publish(AppEvents.deleteGoal, { goalId: goalData.id })}>
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
