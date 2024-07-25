/* eslint no-console: ["error", { allow: ["error"] }] */

import React, { useContext, useEffect } from 'react';

import {
  type ViewNavigationAction,
  useViewNavigationAction,
} from './handlers/useViewNavigationAction';

type VerifyAction<A extends { type: string }> = A;

export type Action = VerifyAction<ViewNavigationAction>;

type ActionHandler = (action: Action) => Promise<void>;

type ActionsProps = {
  actionsOnInitialize?: Action[];
  children: React.ReactNode;
};

type ActionContextType = {
  trigger: (actions: Action[]) => Promise<void>;
};

const ActionContext = React.createContext<ActionContextType>({
  trigger: async () => {},
});

// TODO: make this component generic on `type:Action` and take handler as a prop
const Actions: React.FC<ActionsProps> = ({
  actionsOnInitialize = [],
  children,
}) => {
  const handler = tryActionHandler(useActionHandler());

  const trigger = async (actions: Action[]) => {
    await Promise.all(
      actions.map(async (action) => {
        return handler(action);
      }),
    );
  };

  useEffect(() => {
    trigger(actionsOnInitialize);
  }, []);

  return (
    <ActionContext.Provider value={{ trigger }}>
      {children}
    </ActionContext.Provider>
  );
};

const tryActionHandler = (handler: ActionHandler): ActionHandler => {
  return async (action: Action) => {
    try {
      await handler(action);
    } catch (error) {
      console.error(`Error while handling action: ${action.type} ->`, error);
    }
  };
};

type UseTrigger = () => (actions: Action[]) => Promise<void>;

export const useTrigger: UseTrigger = () => {
  const { trigger } = useContext(ActionContext);

  return trigger;
};

type UseActionHandler = () => ActionHandler;

const useActionHandler: UseActionHandler = () => {
  const handleViewNavigationAction = useViewNavigationAction();

  return async (action) => {
    const { type } = action;

    switch (type) {
      case 'viewContainerNavigation': {
        await handleViewNavigationAction(action);
        return;
      }
      default: {
        const unreachable: never = type;
        throw new Error(`unknown action type: ${unreachable}`);
      }
    }
  };
};

export default Actions;
