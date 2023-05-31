import PropTypes from 'prop-types';

export default function Events({ events }) {
  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}

Events.propTypes = {
  events: PropTypes.array.isRequired,
};

