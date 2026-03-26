import PropTypes from 'prop-types';

const SkeletonLoader = ({ className = "" }) => {
  return (
    <div className={`bg-gray-700 animate-skeleton ${className}`} />
  );
};

SkeletonLoader.propTypes = {
  className: PropTypes.string,
};

export default SkeletonLoader;