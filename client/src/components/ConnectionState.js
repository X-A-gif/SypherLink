
import PropTypes from 'prop-types';
export function ConnectionState({ isConnected }) {
  return <p>State: {String(isConnected)}</p>;
}

ConnectionState.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};