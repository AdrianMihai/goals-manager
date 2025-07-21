import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { StyledAnalysisCloseButton, StyledAnalysisPreviewButton, StyledAnalysisTitle } from './StyledComponents';
import { Conditional } from '../../Conditional';
import { GoalItemContext } from './GoalItemContext';
import { marked } from 'marked';
import { Container } from '../../layout/Container';
import { Row } from '../../layout/Row';
import { useTimedToggle } from '../../hooks/Common';
import { Dialog } from '../../surfaces/dialog/Dialog';
import { StyledDialogFooter } from '../../surfaces/dialog/StyledComponents';
import { DialogBody } from '../../surfaces/dialog/DialogBody';
import { isNullOrUndefined } from '../../../utils/ObjectUtils';

export const AnalysisPreview = ({ analysisData }) => {
  const { goalData, freezeEditMode, unFreezeEditMode } = useContext(GoalItemContext);

  const content = useMemo(() => marked(analysisData.analysisContent), [analysisData.analysisContent]);
  const { isOn: isOpen, switchOn: open, switchOff: close } = useTimedToggle(false);

  const onOpenChange = useCallback(
    (e) => {
      e.open ? open() : close();
    },
    [open, close]
  );

  useEffect(() => {
    if (!isOpen) return;

    freezeEditMode();

    return () => unFreezeEditMode();
  }, [isOpen]);

  return (
    <>
      <Conditional when={!isNullOrUndefined(analysisData.analysisContent)}>
        <StyledAnalysisPreviewButton onClick={open}>View Analysis</StyledAnalysisPreviewButton>
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
