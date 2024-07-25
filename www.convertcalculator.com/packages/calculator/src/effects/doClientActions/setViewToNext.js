import {
    ButtonActionsEnum
} from '@cc/shared/enums/button-actions';

import calculatorIdState from '../../recoil/calculatorIdState';
import isValidState from '../../recoil/isValidState';
import selectedViewState from '../../recoil/selectedViewState';
import showErrorsState from '../../recoil/showErrorsState';
import triggerEvent from '../../util/triggerEvent';

const setViewToNext = async ({
    recoilProps
}) => {
    const {
        set,
        snapshot
    } = recoilProps;

    const calculatorId = await snapshot.getPromise(calculatorIdState);
    const isValid = snapshot.getLoadable(isValidState).contents;
    const selectedView = snapshot.getLoadable(selectedViewState).contents;

    set(showErrorsState, false);

    if (isValid) {
        set(selectedViewState, selectedView + 1);
    } else {
        set(showErrorsState, true);
    }

    triggerEvent({
        calculatorId,
        type: ButtonActionsEnum.NAVIGATE_TO_NEXT_VIEW,
    });
};

export default setViewToNext;