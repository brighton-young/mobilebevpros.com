import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import { useCalculatorId, useProfileProp } from '../CalculatorState';
import { Flex } from '../styles/components/Flex';

import {
  StyledBody,
  StyledHeader,
  StyledLink,
  StyledWrapper,
} from './DevTools.styles';
import DevToolsFeatureFlags from './DevToolsFeatureFlags';

type DevToolsContextType = {
  isDevToolsOpen: boolean;
};

const DevToolsContext = createContext<DevToolsContextType>({
  isDevToolsOpen: false,
});

export const useDevToolsContext = () => {
  return useContext(DevToolsContext);
};

const DevTools = ({ children }: { children: React.ReactNode }) => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      const isModActive = ev.ctrlKey || ev.metaKey;
      const isShiftActive = ev.shiftKey;
      const isKeyActive = ev.key.toLowerCase() === 'm';

      if (!isModActive || !isShiftActive || !isKeyActive) return;

      ev.preventDefault();

      setIsDevToolsOpen((prev) => {
        return !prev;
      });
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const profileId = useProfileProp('_id') as string;
  const calculatorId = useCalculatorId();

  const memoizedValue = useMemo(() => {
    return {
      isDevToolsOpen,
    };
  }, [isDevToolsOpen]);

  return (
    <>
      <DevToolsContext.Provider value={memoizedValue}>
        {children}
      </DevToolsContext.Provider>

      {isDevToolsOpen && (
        <StyledWrapper>
          <StyledHeader>
            <Flex gap="1rem" justifyContent="space-between">
              <div>Muad&apos;Dib</div>

              <Flex gap="1rem" justifyContent="flex-end">
                <div>
                  Calc:{' '}
                  <StyledLink
                    target="_blank"
                    href={getWebsiteUrl({
                      slug: `/app/calculators/${calculatorId}/build`,
                    })}
                  >
                    {calculatorId}
                  </StyledLink>
                </div>
                <div>
                  Prof:{' '}
                  <StyledLink
                    target="_blank"
                    href={getWebsiteUrl({
                      slug: `/app/admin/profiles/${profileId}`,
                    })}
                  >
                    {profileId}
                  </StyledLink>
                </div>
              </Flex>
            </Flex>
          </StyledHeader>
          <StyledBody>
            <DevToolsFeatureFlags />
          </StyledBody>
        </StyledWrapper>
      )}
    </>
  );
};

export default DevTools;
