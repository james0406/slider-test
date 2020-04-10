import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';

import DragManager from './drag-manager';
import Timer from './timer';
import 'styles/scss/components/carousel/index.scss';

const AUTO_INCREAMENT_TIME = 3000;
const initialState = {
  items: [],
  currentIndex: 1,
};

function Carousel({ children, width, height }) {
  const [state, setState] = useState(initialState);
  const [left, setLeft] = useState('-100%');
  const sliderRef = useRef(null);
  const { items, currentIndex } = state;

  function updateItems() {
    const { length } = children;
    const firstChild = cloneElement(children[length - 1], { key: -1 });
    const lastChild = cloneElement(children[0], { key: length + 2 });
    setState({
      ...state,
      items: [firstChild, ...children, lastChild],
    });
  }

  function increaseIndex() {
    const nextIndex = currentIndex + 1;
    if (nextIndex < items.length) {
      setState({ ...state, currentIndex: nextIndex });
      return;
    }
    setState({ ...state, currentIndex: 1 });
  }

  function decreaseIndex() {
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      setState({ ...state, currentIndex: nextIndex });
      return;
    }
    setState({ ...state, currentIndex: items.length - 2 });
  }

  function setTransitionActive(isActive) {
    const slider = sliderRef.current;
    if (isActive) {
      slider.className = 'carousel__slider';
      return;
    }
    slider.className = 'carousel__slider carousel__slider--no-transition';
  }

  function getCurrentLeft() {
    return `${currentIndex * -100}%`;
  }

  function handleDragging(deltaX) {
    setLeft(`calc(${getCurrentLeft()} + ${deltaX}px)`);
  }

  function handleDragEnd(deltaX) {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const value = deltaX / rect.width;
    if (value <= -0.5) {
      increaseIndex();
      return;
    }
    if (value >= 0.5) {
      decreaseIndex();
      return;
    }
    setLeft(getCurrentLeft());
  }

  function handleTransitionEnd() {
    if (currentIndex === items.length - 1) {
      setTransitionActive(false);
      increaseIndex();
      return;
    }
    if (currentIndex === 0) {
      setTransitionActive(false);
      decreaseIndex();
      return;
    }
  }

  useEffect(() => {
    setLeft(getCurrentLeft());
    if (currentIndex !== 1 && currentIndex !== items.length - 2) {
      setTransitionActive(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    updateItems();
  }, [children]);

  const render = useMemo(() => {
    return (
      <div className="carousel" style={{ width, height }}>
        <DragManager
          handleDragging={handleDragging}
          handleDragEnd={handleDragEnd}
          setTransitionActive={setTransitionActive}
        />
        <Timer
          cooltime={AUTO_INCREAMENT_TIME}
          callback={() => {
            increaseIndex();
          }}
        />
        <div
          ref={sliderRef}
          className="carousel__slider"
          style={{ left }}
          onTransitionEnd={handleTransitionEnd}
        >
          {items}
        </div>
      </div>
    );
  }, [width, height, items, left]);

  return render;
}

export default Carousel;

Carousel.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
