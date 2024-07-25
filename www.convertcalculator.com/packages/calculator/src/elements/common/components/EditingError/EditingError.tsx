import React from 'react';

import { useIsEditing } from '../../../../CalculatorState';

type EditingErrorProps = {
  children: React.ReactNode;
};

const EditingError: React.FC<EditingErrorProps> = ({ children }) => {
  if (!useIsEditing()) {
    return null;
  }

  // TODO: maybe send some info to our backend here?
  // `EditingError` could take a `context` prop and send it to our backend
  // https://trello.com/c/az5ZLiZF/12-runtime-calculator-user-errors
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {children}
    </div>
  );
};

export default EditingError;
