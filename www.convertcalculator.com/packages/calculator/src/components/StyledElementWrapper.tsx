import styled from 'styled-components';

import { colors } from '../styles';

interface Props {
  isEditing?: boolean;
  isLiveMode?: boolean;
  isHidden?: boolean;
  isError?: boolean;
  styles: any;
}

export const StyledElementWrapper = styled.div<Props>`
  ${({ styles }) => {
    return `
    margin-top: ${styles.marginTop};
    margin-right: ${styles.marginRight};
    margin-bottom: ${styles.marginBottom};
    margin-left: ${styles.marginLeft};

    padding-top: ${styles.paddingTop};
    padding-right: ${styles.paddingRight};
    padding-bottom: ${styles.paddingBottom};
    padding-left: ${styles.paddingLeft};

    position: relative; //This is used for field errors
  `;
  }}

  ${({ isError }) => {
    if (isError) {
      return `
        * {
          color: ${colors.alertColor};
        }
      `;
    }

    return '';
  }}

  ${({ isEditing, isHidden, isLiveMode }) => {
    if (isHidden && isEditing && !isLiveMode) {
      return `
          opacity: 0.4;
        `;
    }

    return undefined;
  }}
`;
