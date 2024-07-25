import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useRecoilCallback } from 'recoil';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import useEventListener from '@cc/shared/hooks/useEventListener';
import fetchJson from '@cc/shared/utils/fetchJson';

import {
  useCalculatorId,
  useCalculatorProp,
  useFingerprint,
  useIsDebugging,
  useIsProduction,
} from '../CalculatorState';
import useTrackExternalEvent from '../effects/useTrackExternalEvent';
import { getClientHref, getSiteUrl } from '../helpers';
import formFieldsState from '../recoil/formFieldsState';
import getCurrentFrameElement from '../util/getCurrentFrameElement';
import getFramedWindow from '../util/getFramedWindow';
import getScrollParent from '../util/getScrollParent';

const TrackerStoreContext = createContext();

export const useTracker = () => {
  return useContext(TrackerStoreContext) || {};
};
class Timer {
  constructor() {
    this.duration = 0;
  }

  start() {
    if (this.isActive) {
      this.duration = this.getDuration();
    }

    this.createdAt = new Date();
    this.isActive = true;
  }

  stop() {
    this.duration = this.getDuration();
    this.createdAt = undefined;
    this.isActive = false;
  }

  reset() {
    this.duration = 0;
    this.isActive = false;
  }

  getDuration() {
    if (!this.createdAt) return this.duration;

    return (
      this.duration +
      Math.round(new Date().getTime() - this.createdAt.getTime())
    );
  }
}

const sessionTimer = new Timer();
const visibilityTimer = new Timer();
const interactionTimer = new Timer();

const Tracker = ({ children, framedUrl }) => {
  const calculatorId = useCalculatorId();
  const shouldCaptureFormDataInVisits = useCalculatorProp(
    'shouldCaptureFormDataInVisits',
  );
  const fingerprint = useFingerprint();
  const isDebugging = useIsDebugging();
  const isProduction = useIsProduction();

  const trackerEl = useRef(null);

  const [isVisible, setVisible] = useState(false);
  const [userTookAction, setUserTookAction] = useState(false);
  const [visitData, setVisitData] = useState({});

  const trackExternalEvent = useTrackExternalEvent();

  const handleTrackEvent = (name, properties = {}) => {
    setVisitData(properties);

    trackExternalEvent(name, properties);

    if (isDebugging) {
      console.log('📈 Tracking: ', name, properties);
    }
  };

  // Handle Session Start
  useEffect(() => {
    handleTrackEvent('startSession');

    sessionTimer.start();
  }, []);

  // Handle Calculator Visibility Change
  useEffect(() => {
    if (isVisible) {
      visibilityTimer.start();
    } else {
      visibilityTimer.stop();
    }

    handleTrackEvent('visibilityChange', {
      isVisible,
      interactionDuration: interactionTimer.getDuration(),
      sessionDuration: sessionTimer.getDuration(),
      visibilityDuration: visibilityTimer.getDuration(),
      userTookAction,
    });
  }, [isVisible]);

  useEffect(() => {
    if (!trackerEl.current) return undefined;

    const scrollableParent = getScrollParent(trackerEl.current);

    if (!scrollableParent) return undefined;

    const handleCheckVisibility = () => {
      const newIsVisible = getCalculatorVisiblity(trackerEl.current);
      setVisible(newIsVisible);
    };

    scrollableParent.addEventListener('scroll', handleCheckVisibility);

    handleCheckVisibility();

    return () => {
      scrollableParent.removeEventListener('scroll', handleCheckVisibility);
    };
  }, [trackerEl.current]);

  // Handle Tab Visibility Change
  const handleVisibilityChange = useRecoilCallback(({ snapshot }) => {
    return async () => {
      const formFields = await snapshot.getPromise(formFieldsState);

      if (document.visibilityState === 'visible') {
        handleTrackEvent('startSession');

        sessionTimer.reset();
        visibilityTimer.reset();
        interactionTimer.reset();

        sessionTimer.start();
      }

      if (document.visibilityState === 'hidden') {
        sessionTimer.stop();
        visibilityTimer.stop();
        interactionTimer.stop();

        handleTrackEvent('stopSession', {
          interactionDuration: interactionTimer.getDuration(),
          sessionDuration: sessionTimer.getDuration(),
          visibilityDuration: visibilityTimer.getDuration(),
          userTookAction,
        });

        if (isProduction) {
          await fetchJson({
            url: getSiteUrl({ slug: '/api/embed/create-visit/' }),
            data: {
              calculatorId,
              fingerprint,
              url: framedUrl ?? getClientHref(),
              isProduction,
              visitData: {
                interactionDuration: interactionTimer.getDuration(),
                sessionDuration: sessionTimer.getDuration(),
                visibilityDuration: visibilityTimer.getDuration(),
                userTookAction,
                ...(shouldCaptureFormDataInVisits && {
                  formData: {
                    fields: formFields,
                  },
                }),
              },
            },
            method: 'POST',
          });
        }
      }
    };
  });

  useEffectDeepCompare(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [calculatorId, isVisible, visitData]);

  const handleDoServerSideActions = (payload) => {
    setUserTookAction(true);

    const { formData, hasCheckoutWithStripeAction } = payload;
    const { amount, currency } = formData.hidden;

    handleTrackEvent(hasCheckoutWithStripeAction ? 'checkout' : 'submit', {
      ...payload,
      amount,
      currency,
      interactionDuration: interactionTimer.getDuration(),
      sessionDuration: sessionTimer.getDuration(),
      visibilityDuration: visibilityTimer.getDuration(),
      userTookAction,
    });
  };

  const handleInteraction = (payload) => {
    const { additionalProps } = payload;
    const { answers, formData } = additionalProps;

    interactionTimer.start();
    window.setTimeout(() => {
      interactionTimer.stop();
    }, 30000);

    handleTrackEvent('interaction', {
      answers,
      formData,
      interactionDuration: interactionTimer.getDuration(),
      sessionDuration: sessionTimer.getDuration(),
      visibilityDuration: visibilityTimer.getDuration(),
      userTookAction,
    });
  };

  useEventListener('interaction', (ev) => {
    handleInteraction(ev.detail);
  });

  const handleNavigateToView = (payload) => {
    handleTrackEvent('navigateToView', {
      ...payload,
      interactionDuration: interactionTimer.getDuration(),
      sessionDuration: sessionTimer.getDuration(),
      visibilityDuration: visibilityTimer.getDuration(),
      userTookAction,
    });
  };

  useEventListener('navigateToView', (ev) => {
    handleNavigateToView(ev.detail);
  });

  const handleLinkToExternalPage = (payload) => {
    setUserTookAction(true);

    handleTrackEvent('redirect', {
      ...payload,
      interactionDuration: interactionTimer.getDuration(),
      sessionDuration: sessionTimer.getDuration(),
      visibilityDuration: visibilityTimer.getDuration(),
      userTookAction,
    });
  };

  return (
    <TrackerStoreContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        onDoServerSideActions: handleDoServerSideActions,
        onInteraction: handleInteraction,
        onLinkToExternalPage: handleLinkToExternalPage,
      }}
    >
      <div ref={trackerEl} style={{ height: '100%' }}>
        {children}
      </div>
    </TrackerStoreContext.Provider>
  );
};

const getCalculatorVisiblity = (trackerEl) => {
  if (!trackerEl) return false;

  // If Calculator is framed, use iFrame to calculate visibility
  // otherwise use calculator container
  const frame = getCurrentFrameElement();

  const containerElement = frame || trackerEl;

  const { top, bottom, left, right } = containerElement.getBoundingClientRect();

  const framedWindow = getFramedWindow();
  const windowHeight =
    framedWindow?.innerHeight || document.documentElement.clientHeight;
  const windowWidth =
    framedWindow?.innerWidth || document.documentElement.clientWidth;

  const newIsInView =
    (top > 0 || bottom > 0) &&
    top < windowHeight &&
    (left > 0 || right > 0) &&
    left < windowWidth;

  return newIsInView;
};

export default Tracker;
