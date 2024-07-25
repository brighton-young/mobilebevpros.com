import getIsFramed from './getIsFramed';
import postMessageToFrame from './postMessageToFrame';

type TriggerEventProps = {
  calculatorId: string;
  type: string;
  payload?: Record<string, unknown>;
  options?: {
    triggerInPage?: boolean;
    triggerFramed?: boolean;
  };
};

const triggerEvent = ({
  calculatorId,
  type,
  payload = {},
  options = {},
}: TriggerEventProps) => {
  const { triggerInPage = true, triggerFramed = true } = options;

  const isFramed = getIsFramed();

  if (isFramed && triggerFramed) {
    postMessageToFrame({
      calculatorId,
      type,
      payload,
    });
  } else if (triggerInPage) {
    const event = new CustomEvent('ccEvent', {
      detail: { calculatorId, type, payload },
    });
    window.dispatchEvent(event);
  }
};

export default triggerEvent;
