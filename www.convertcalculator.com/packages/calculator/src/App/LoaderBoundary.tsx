import Loader from '../components/Loader';

const LoaderBoundary = ({ children, isLoading }) => {
  if (isLoading) {
    if (isLoading) return <Loader />;
  }

  return children;
};

export default LoaderBoundary;
