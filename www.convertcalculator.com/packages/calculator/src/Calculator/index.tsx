// FF: dataAsPropsRefactor - Remove this wrapper file when the feature flag is removed

import App from '../App';
import useFetchData from '../App/useFetchData';

import Calculator from './Calculator';

const CalculatorWrapper = (props) => {
  const { data } = useFetchData({
    calculatorId: props.calculatorId,
    dataFromProps: props.data,
    embedType: props.embedType,
  });

  if (data?.featureFlags?.dataAsPropsRefactor) {
    return <App {...props} data={data} />;
  }

  return <Calculator {...props} data={data} />;
};

export default CalculatorWrapper;
