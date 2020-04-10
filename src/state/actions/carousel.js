import {
  INCREASE_CAROUSEL_INDEX,
  DECREASE_CAROUSEL_INDEX,
  UPDATE_CAROUSEL_ITEMS,
} from './types';

export const updateItems = (children) => {
  return { type: UPDATE_CAROUSEL_ITEMS, payload: { children } };
};

export const increaseIndex = () => {
  return { type: INCREASE_CAROUSEL_INDEX };
};

export const decreaseIndex = () => {
  return { type: DECREASE_CAROUSEL_INDEX };
};
