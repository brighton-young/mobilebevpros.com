import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import HorizontalRule from '../../../components/HorizontalRule';

type DividerProps = {
  element: DividerElement;
  isHidden: boolean;
};

export type DividerElement = {
  type: 'divider';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  divider: {
    borderColor: string;
    borderStyle: string;
    borderWidth: number;
  };
};

const Divider = ({ element, isHidden }: DividerProps) => {
  const { divider } = element;

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isHidden={isHidden}
    >
      <ElementClassNameWrapper element={element}>
        <HorizontalRule
          borderColor={divider.borderColor}
          borderStyle={divider.borderStyle}
          borderWidth={divider.borderWidth}
        />
      </ElementClassNameWrapper>
    </ElementStyleWrapper>
  );
};

export default Divider;
