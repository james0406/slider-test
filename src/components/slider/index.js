import React from 'react';
import PropTypes from 'prop-types';

import 'styles/scss/components/slider/index.scss';

function Slider({ children, width, height }) {
  return (
    <div className="slider" style={{ width, height }}>
      <div className="slider__drag-area"></div>
      <div className="slider__container">{children}</div>
    </div>
  );
}

export default Slider;
