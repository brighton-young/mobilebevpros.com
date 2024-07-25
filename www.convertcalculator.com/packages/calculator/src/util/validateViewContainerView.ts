import { Snapshot } from 'recoil';

import answersState from '../recoil/answersState';
import calculatorState from '../recoil/calculatorState';
import formulasState from '../recoil/formulasState';

import findNestedItem from './findNestedItem';
import validate from './validate';

const validateViewContainerView = (snapshot: Snapshot, itemId: string) => {
  const calculatorContents = snapshot.getLoadable(calculatorState).contents;
  const outputs = snapshot.getLoadable(formulasState).contents;
  const answers = snapshot.getLoadable(answersState).contents;

  const viewContainerElement = findNestedItem({
    items: calculatorContents.items,
    itemId,
  });

  if (!viewContainerElement) {
    return true;
  }

  return validate({
    calculator: calculatorContents,
    outputs,
    answers,
    items: viewContainerElement.children,
  });
};

export default validateViewContainerView;
