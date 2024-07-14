import PropTypes from 'prop-types';
import css from './Loader.module.css';
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ hidden }) => {
  return (
    <div className={hidden ? css.hidden : css.loaderContainer}>
      <ClipLoader color="rgba(82, 59, 126, 0.6)" />
    </div>
  );
};

Loader.propTypes = {
  hidden: PropTypes.bool
};

export default Loader;