import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import 'styles/scss/components/carousel/__drag-manager.scss';

const initialState = {
  startX: null,
  deltaX: 0,
};

function DragManager({
  handleDragStart,
  handleDragging,
  handleDragEnd,
  setTransitionActive,
}) {
  const [state, setState] = useState(initialState);
  const [isDragEnd, setIsDragEnd] = useState(false);

  useEffect(() => {
    if (!isDragEnd) return;
    setTransitionActive(true);
    handleDragEnd(state.deltaX);
    setState({ ...state, startX: null, deltaX: 0 });
    setIsDragEnd(false);
  }, [isDragEnd]);

  useEffect(() => {
    function handleMouseUp() {
      setIsDragEnd(true);
    }

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const render = useMemo(() => {
    return (
      <div
        className="carousel__drag-manager"
        onMouseDown={(event) => {
          setTransitionActive(false);
          setState({ ...state, startX: event.clientX });
        }}
        onMouseMove={(event) => {
          const { startX } = state;
          if (!startX) return;
          const { clientX } = event;
          const deltaX = clientX - startX;
          setState({ ...state, deltaX });
          handleDragging(deltaX);
        }}
      />
    );
  }, [state]);
  return render;
}

export default DragManager;

DragManager.propTypes = {
  handleDragging: PropTypes.func.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
  setTransitionActive: PropTypes.func.isRequired,
};
