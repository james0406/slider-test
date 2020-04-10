import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DELAY = 100;

function Timer({ cooltime, callback }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time >= cooltime) {
      callback();
      setTime(0);
    }
    const timeout = setTimeout(() => {
      setTime(time + DELAY);
    }, DELAY);
    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return <div></div>;
}

export default Timer;

Timer.propTypes = {
  cooltime: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
};
