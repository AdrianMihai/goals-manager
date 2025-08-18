import { marked } from 'marked';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useTimedToggle } from '../../hooks/Common';
import { Container } from '../../layout/Container';
import { Row } from '../../layout/Row';
import { Dialog } from '../../surfaces/dialog/Dialog';
import { DialogBody } from '../../surfaces/dialog/DialogBody';
import { StyledDialogFooter } from '../../surfaces/dialog/StyledComponents';
import { GoalItemContext } from './GoalItemContext';
import { StyledAnalysisCloseButton, StyledAnalysisLoadingSpinner, StyledAnalysisTitle } from './StyledComponents';
import { useStore } from '../../../state/UseStore';
import { GoalsCollection, GoalsStore } from '../../../stores/GoalsStore';
import { EmptyRoadmap } from '../../../models/Goal';
import { AppEvents, AppMediator } from '../../../events/AppMediator';
import { Conditional } from '../../Conditional';
import { LoadingBackdrop } from '../../surfaces/LoadingBackdrop';
import { IconSize } from '../../../resources/SVGIcon';
import Loading from '@mdi/svg/svg/loading.svg';

const roadmapDataComparer = (prev, next) => prev.roadmapAnalysis !== next.roadmapAnalysis;

export const AnalysisPreview = () => {
  const { goalData, freezeEditMode, unFreezeEditMode } = useContext(GoalItemContext);
  const [{ roadmapAnalysis }] = useStore<GoalsCollection>(GoalsStore, roadmapDataComparer);
  const roadmapData = useMemo(() => roadmapAnalysis[goalData.id] || EmptyRoadmap, [roadmapAnalysis, goalData.id]);

  const content = useMemo(() => marked(roadmapData.analysisContent), [roadmapData.analysisContent]);
  const { isOn: isOpen, switchOn: open, switchOff: close } = useTimedToggle(false);

  const onOpenChange = useCallback(
    (e) => {
      e.open ? open() : close();
    },
    [open, close]
  );

  useEffect(() => {
    const displayAnalysisSubscription = AppMediator.subscribe(
      AppEvents.showRoadmapAnalysis,
      ({ goalId }) => goalId === goalData.id && open()
    );

    return () => displayAnalysisSubscription.unsubscribe();
  }, [goalData, open]);

  useEffect(() => {
    if (!isOpen) return;

    freezeEditMode();

    return () => unFreezeEditMode();
  }, [isOpen]);

  return (
    <>
      <Conditional when={roadmapData.isAnalysisInProgress}>
        <LoadingBackdrop>
          <StyledAnalysisLoadingSpinner size={IconSize.VeryLarge}>
            <Loading />
          </StyledAnalysisLoadingSpinner>
        </LoadingBackdrop>
      </Conditional>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <Container verticalSpacing={10} horizontalSpacing={10}>
          <StyledAnalysisTitle>{`Roadmap Analysis - ${goalData.text}`}</StyledAnalysisTitle>
        </Container>
        <DialogBody>
          <Container horizontalSpacing={10} verticalSpacing={10} dangerouslySetInnerHTML={{ __html: content }} />
        </DialogBody>
        <StyledDialogFooter horizontalSpacing={10} verticalSpacing={10}>
          <Row mainAxisAlignment='end'>
            <StyledAnalysisCloseButton onClick={close}>Close</StyledAnalysisCloseButton>
          </Row>
        </StyledDialogFooter>
      </Dialog>
    </>
  );
};
