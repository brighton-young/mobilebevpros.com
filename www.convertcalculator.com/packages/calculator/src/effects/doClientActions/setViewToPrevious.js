import {
    ButtonActionsEnum
} from '@cc/shared/enums/button-actions';

import calculatorIdState from '../../recoil/calculatorIdState';
import selectedViewState from '../../recoil/selectedViewState';
import triggerEvent from '../../util/triggerEvent';

const setViewToPrevious = async ({
    recoilProps
}) => {
    const {
        set,
        snapshot
    } = recoilProps;

    const selectedView = await snapshot.getPromise(selectedViewState);
    const calculatorId = await snapshot.getPromise(calculatorIdState);

    if (selectedView === 0) return 0;

    set(selectedViewState, selectedView - 1);

    triggerEvent({
        calculatorId,
        type: ButtonActionsEnum.NAVIGATE_TO_PREVIOUS_VIEW,
    });

    return 1;
};

export default setViewToPrevious;