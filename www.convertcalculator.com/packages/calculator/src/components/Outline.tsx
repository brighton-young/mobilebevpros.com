import { Fragment, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import { useCalculatorId, useIsTesting } from '../CalculatorState';
import { borderRadius, colors } from '../styles';
import fetchJson from '../util/fetchJson';
import getRootWindow from '../util/getRootWindow';

import Icon from './Icon';

const OutlineWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  @media print {
    display: none;
  }
`;

const Flex = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${(props) => {
    return props.gap || '0.5rem';
  }};
  align-items: center;
`;

type OutlineProps = {
  calculator: any;
  embedType: string;
  profile: any;
};

const useShowBranding = () => {
  const [showBranding, setShowBranding] = useState(false);

  const isTesting = useIsTesting();
  const calculatorId = useCalculatorId();

  useEffect(() => {
    if (isTesting) return;

    const getPlan = async () => {
      try {
        const url = new URL(
          getWebsiteUrl({
            slug: '/api/embed/plan',
          }),
        );

        url.searchParams.append('calculatorId', calculatorId);

        const plan = await fetchJson<string>({
          url: url.toString(),
          method: 'GET',
        });

        setShowBranding(plan === 'free');
      } catch (error) {
        console.error(`Could not fetch plan: ${error}`);
      }
    };

    getPlan();
  }, [isTesting, calculatorId]);

  return showBranding;
};

const Outline = ({ calculator, embedType }: OutlineProps) => {
  const showBranding = useShowBranding();

  useEffect(() => {
    console.log(
      '💡 The interactive content on this page is powered by https://www.ConvertCalculator.com',
    );
  }, []);

  if (embedType === 'standalone') {
    return (
      <OutlineWrapper>
        <Flex>
          {calculator.showPrintButton && (
            <PrintButton
              role="button"
              onClick={() => {
                if (typeof window === 'undefined') return;

                window.print();
              }}
            >
              <Flex gap="0.5rem">
                <Icon name="print" size={20} />
                <div>Print</div>
              </Flex>
            </PrintButton>
          )}
          {showBranding && <BadgeWrapper />}
        </Flex>
      </OutlineWrapper>
    );
  }

  if (showBranding) {
    return <BadgeWrapper />;
  }

  return false;
};

const PrintButton = styled.div`
  padding: 0.25rem 0.75rem;
  background: ${colors['gray-200']};
  color: ${colors['gray-800']};
  border: 1px solid ${colors['gray-300']};
  border-radius: ${borderRadius.lg};
  line-height: 2.25;
  font-size: 0.75rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background: ${colors['gray-300']};
  }
`;

const badgeWrapperStyles = {
  display: 'inline-block',
  visibility: 'visible',
  opacity: '1',
  tranform: 'none',
  position: 'relative',
  overflow: 'visible',
  'font-size': '1rem',
  'line-height': '1',
};

const badgeLinkStyles = {
  width: 'auto',
  display: 'flex',
  visibility: 'visible',
  opacity: '1',
  tranform: 'none',
  position: 'relative',
  overflow: 'visible',
  'align-items': 'center',
  gap: '0.5rem',
  'font-family': 'system-ui, sans-serif',
  border: `1px solid ${colors['gray-300']}`,
  padding: '0.375rem 0.5rem',
  'font-size': '0.75rem',
  color: `${colors['gray-800']}`,
  'border-radius': '4px',
  background: `${colors['gray-100']}`,
  'font-weight': '600',
  'text-transform': 'none',
  'text-decoration': 'none',
  'min-height': '36px',
  'max-height': '9999px',
  'line-height': '1',
};

const badgeImageStyles = {
  height: '22px',
  width: '22px',
  visibility: 'visible',
  opacity: '1',
  tranform: 'none',
  position: 'relative',
  overflow: 'visible',
  display: 'block',
};

const BadgeLink = styled.a`
  &:hover {
    background: ${colors['gray-200']} !important;
  }
`;

const Badge = ({ title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const link = getLink({ title });

  const badgeWrapperEl = useRef(null);
  const badgeLinkEl = useRef(null);
  const badgeImageEl = useRef(null);

  useEffect(() => {
    if (badgeWrapperEl.current) {
      Object.entries(badgeWrapperStyles).forEach(([prop, propValue]) => {
        badgeWrapperEl.current.style.setProperty(prop, propValue, 'important');
      });
    }

    if (badgeLinkEl.current) {
      Object.entries(badgeLinkStyles).forEach(([prop, propValue]) => {
        badgeLinkEl.current.style.setProperty(prop, propValue, 'important');

        if (isHovered) {
          badgeLinkEl.current.style.setProperty(
            'background-color',
            colors['gray-200'],
            'important',
          );
        }
      });
    }

    if (badgeImageEl.current) {
      Object.entries(badgeImageStyles).forEach(([prop, propValue]) => {
        badgeImageEl.current.style.setProperty(prop, propValue, 'important');
      });
    }
  }, []);

  return (
    <div
      ref={badgeWrapperEl}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <BadgeLink ref={badgeLinkEl} href={link} target="_blank">
        <img
          ref={badgeImageEl}
          src="https://www.convertcalculator.com/img/icon-round.png"
          alt="ConvertCalculator Logo"
          width={22}
        />
        Made with ConvertCalculator
      </BadgeLink>
    </div>
  );
};

const getLink = ({ title }) => {
  const rootWindow = getRootWindow();

  if (!rootWindow) return 'http://www.convertcalculator.com';

  const { hostname, href } = rootWindow.location;

  return `http://www.convertcalculator.com/?utm_source=${hostname}&utm_medium=embed&utm_campaign=${title}&utm_content=${href}`;
};

const BadgeWrapper = (props) => {
  const badgeObserverRef = useRef(null);
  const badgeKeyRef = useRef(1);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      badgeKeyRef.current += 1;
    });

    observer.observe(badgeObserverRef.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Fragment key={badgeKeyRef.current}>
      <div ref={badgeObserverRef}>
        <Badge {...props} />
      </div>
    </Fragment>
  );
};

export default Outline;
