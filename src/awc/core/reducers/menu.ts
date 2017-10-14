import * as menu from '../actions/menu';

export interface State {
  displaying: boolean;
}

const initialState: State = {
  displaying: false
};

export function reducer(state = initialState, action: menu.Actions): State {
  switch (action.type) {
    case menu.TOGGLE_MENU: {
      return {
        displaying: !state.displaying
      };
    }
    case menu.SHOW_MENU: {
      return {
        displaying: true
      };
    }
    case menu.HIDE_MENU: {
      return {
        displaying: false
      };
    }
    default: {
      return initialState;
    }
  }
}

export const getMenuDisplaying = (state: State): boolean => state.displaying;
