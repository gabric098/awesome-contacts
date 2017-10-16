import * as alert from '../actions/alert';
import { Alert } from '../models/alert';

export interface State {
  alert: Alert;
}

const initialState: State = {
  alert: null
};

export function reducer(state = initialState, action: alert.Actions): State {
  switch (action.type) {
    case alert.SHOW_ALERT: {
      return {
        alert: action.payload
      };
    }
    case alert.HIDE_ALERT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getAlert = (state: State) => state.alert;
