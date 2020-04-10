import {
  UPDATE_CAROUSEL_ITEMS,
  INCREASE_CAROUSEL_INDEX,
  DECREASE_CAROUSEL_INDEX,
} from 'state/actions/types';

export const DEFAULT_STATE = {
  items: [],
  currentIndex: 1,
};

export const carousel = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_CAROUSEL_ITEMS: {
      const { children } = action.payload;
      const { length } = children;
      const firstChild = React.cloneElement(children[length - 1], { key: -1 });
      const lastChild = React.cloneElement(children[0], { key: length + 2 });
      return {
        ...state,
        items: [firstChild, ...children, lastChild],
      };
    }
    case INCREASE_CAROUSEL_INDEX: {
      const nextIndex = currentIndex + 1;
      if (nextIndex < items.length) {
        return { ...state, currentIndex: nextIndex };
      }
      return { ...state, currentIndex: 1 };
    }
    case DECREASE_CAROUSEL_INDEX: {
      const nextIndex = currentIndex - 1;
      if (nextIndex >= 0) {
        return { ...state, currentIndex: nextIndex };
      }
      return { ...state, currentIndex: items.length - 2 };
    }
    default: {
      return state;
    }
  }
};
