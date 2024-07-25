import React, { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

// TODO: this impl calls hooks conditionally, which is not allowed
const usePortal = (): HTMLDivElement => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) return undefined;

  const portalEl = document.createElement('div');
  portalEl.classList.add('cc', 'cc-portal');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const rootElemRef = useRef(portalEl);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const wrapper = document.querySelector('.cc');

    wrapper.appendChild(rootElemRef.current);

    return () => {
      rootElemRef.current.remove();
    };
  }, []);

  return rootElemRef.current;
};

const PortalClient: React.FC<PortalProps> = ({ children }) => {
  const portalEl = usePortal();

  return createPortal(children, portalEl);
};

const Portal: React.FC<PortalProps> = ({ children }) => {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) return children;

  return <PortalClient>{children}</PortalClient>;
};

export default Portal;
