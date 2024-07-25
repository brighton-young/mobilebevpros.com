import { CallbackInterface } from 'recoil';

import type { ButtonElement } from '@cc/db';
import { ButtonActionsEnum } from '@cc/shared/enums/button-actions';
import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';
import { CalculatorFormData } from '@cc/types';

import { uploadFile } from '../components/FileUploadField/helpers';
import answersState from '../recoil/answersState';
import calculatorIdState from '../recoil/calculatorIdState';
import calculatorState from '../recoil/calculatorState';
import fingerprintState from '../recoil/fingerprintState';
import formFieldsState from '../recoil/formFieldsState';
import formulaContextState from '../recoil/formulaContextState';
import isEditingState from '../recoil/isEditingState';
import isProductionState from '../recoil/isProductionState';
import { setFormulaContext } from '../recoil/useSetFormulaContext';
import getFileFromDataUrl from '../util/getFileFromDataURL';
import getFormulas from '../util/getFormulas';

import createUpload from './createUpload';
import getUploadUrl from './getUploadUrl';

const doServerActions = (
  recoilProps: CallbackInterface,
  { jsApi, tracker }: { jsApi: any; tracker: any },
) => {
  return async ({
    element,
    formData,
  }: {
    element: ButtonElement;
    formData?: CalculatorFormData;
  }) => {
    const { snapshot } = recoilProps;

    const hasCheckoutWithStripeAction = !!element.button.actions.find(
      ({ type }) => {
        return ButtonActionsEnum.CHECKOUT_WITH_STRIPE === type;
      },
    );

    const answers = await snapshot.getPromise(answersState);
    const calculator = await snapshot.getPromise(calculatorState);
    const calculatorId = await snapshot.getPromise(calculatorIdState);
    const fingerprint = await snapshot.getPromise(fingerprintState);
    const isEditing = await snapshot.getPromise(isEditingState);
    const isProduction = await snapshot.getPromise(isProductionState);
    const formFields = await snapshot.getPromise(formFieldsState);
    const formulaContext = await snapshot.getPromise(formulaContextState);

    if (isEditing) return undefined;

    const uploads = await Promise.all(
      formFields
        .filter((formField) => {

          if (typeof formField.value !== 'string') return false;

          return formField.value.startsWith('data:');
        })
        .map(async (formField) => {
          if (typeof formField.value !== 'string') return undefined;

          const file = getFileFromDataUrl({
            dataUrl: formField.value,
            fileName: `${formField.reference}`,
          });

          const uploadUrlRes = await getUploadUrl({
            fileName: file.name,
            fileType: file.type,
          });

          const data = await uploadFile({ file, uploadUrlRes });

          await createUpload({
            calculatorId,
            isProduction,
            size: data.size,
            url: data.url,
            name: data.name,
          });

          const fullUploadUrl = getWebsiteUrl({
            slug: `/api/uploads/${encodeURIComponent(data.url)}`,
          });

          return {
            reference: formField.reference,
            uploadUrl: fullUploadUrl,
          };
        }),
    );

    const formFieldsWithUploadUrl = formFields.map((formField) => {
      const upload = uploads.find(({ reference }) => {
        return reference === formField.reference;
      });

      if (!upload) return formField;

      return {
        ...formField,
        label: upload.uploadUrl,
        value: upload.uploadUrl,
      };
    });

    const formulaContextWithUploadUrl = Object.entries(formulaContext).reduce(
      (acc, [key, value]) => {
        const upload = uploads.find(({ reference }) => {
          return reference === key;
        });

        if (!upload) {
          if (isDataURLwithoutUpload(value.value)) {
            return {
              ...acc,
              [key]: undefined,
            };
          }

          return acc;
        }

        return {
          ...acc,
          [key]: upload.uploadUrl,
        };
      },
      formulaContext,
    );

    const formulas = {
      ...getFormulas({
        answers,
        calculatorId,
        contents: calculator.contents,
        engine: calculator.engine,
      }),
      ...formulaContextWithUploadUrl,
    };

    const payload = {
      elementId: element._id,
      formData: {
        fields: [...formFieldsWithUploadUrl, ...(formData?.fields || [])],
        hidden: formData?.hidden || {},
      },
      formulas,
    };

    const result = await fetchJson({
      url: getWebsiteUrl({ slug: '/api/embed/do-actions/' }),
      method: 'POST',
      data: {
        ...payload,
        calculatorId,
        fingerprint,
        isProduction,
      },
    });

    const newPayload = {
      ...payload,
      submissionId: result.submissionId,
    };

    setFormulaContext(recoilProps)({
      IS_SUBMITTED: { value: true, type: 'context' },
      ...result.actionResponses.reduce((acc, actionResponse) => {
        if (actionResponse.type !== ButtonActionsEnum.CONNECT_API) return acc;

        const action = element.button.actions.find(({ _id }) => {
          return _id === actionResponse._id;
        });

        if (!action) return acc;

        return {
          ...acc,
          [action.connectAPI.reference]: {
            value: actionResponse.results[0],
            type: 'context',
          },
        };
      }, {}),
    });

    jsApi.onDoServerSideActions(newPayload, hasCheckoutWithStripeAction);
    tracker.onDoServerSideActions(newPayload, hasCheckoutWithStripeAction);

    return result;
  };
};

const isDataURLwithoutUpload = (dataUrl: string | unknown): boolean => {
  if (typeof dataUrl !== 'string') {
    return false;
  }

  return dataUrl.startsWith('data:');
};

export default doServerActions;
