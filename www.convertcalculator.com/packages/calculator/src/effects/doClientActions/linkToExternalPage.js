import {
    ButtonActionsEnum
} from '@cc/shared/enums/button-actions';
import getRandomSecret from '@cc/shared/utils/getRandomSecret';

import {
    getScriptsUrl
} from '../../helpers/env';
import answersState from '../../recoil/answersState';
import calculatorIdState from '../../recoil/calculatorIdState';
import calculatorState from '../../recoil/calculatorState';
import featureFlagsState from '../../recoil/featureFlagsState';
import formulaContextState from '../../recoil/formulaContextState';
import formulasState from '../../recoil/formulasState';
import workerUrlState from '../../recoil/workerUrlState';
import renderMustacheTemplate from '../../util/renderMustacheTemplate';
import triggerEvent from '../../util/triggerEvent';

const linkToExternalPage = async ({
    action,
    recoilProps,
    jsApi,
    tracker
}) => {
    const {
        snapshot
    } = recoilProps;

    const answers = await snapshot.getPromise(answersState);
    const calculatorId = await snapshot.getPromise(calculatorIdState);
    const results = await snapshot.getPromise(formulasState);
    const calculator = await snapshot.getPromise(calculatorState);
    const formulaCtx = await snapshot.getPromise(formulaContextState);
    const {
        contents,
        engine
    } = calculator;
    const workerUrl =
        (await snapshot.getPromise(workerUrlState)) ? ?
        `${getScriptsUrl({ slug: '/worker.js' })}?hash=${getRandomSecret()}`;

    const featureFlags = await snapshot.getPromise(featureFlagsState);

    const {
        linkUrl,
        shouldOpenInNewTab
    } = action.linkToExternalPage || {};

    if (!linkUrl) return 0;

    const newLinkUrl = await renderMustacheTemplate({
        input: linkUrl,
        answers,
        results,
        formulaCtx,
        contents,
        engine,
        workerUrl,
        featureFlags,
    });

    const payload = {
        linkUrl: newLinkUrl,
        shouldOpenInNewTab
    };

    jsApi.onLinkToExternalPage(payload);
    tracker.onLinkToExternalPage(payload);

    triggerEvent({
        calculatorId,
        type: ButtonActionsEnum.LINK_TO_EXTERNAL_PAGE,
        payload,
    });

    return 1;
};

export default linkToExternalPage;