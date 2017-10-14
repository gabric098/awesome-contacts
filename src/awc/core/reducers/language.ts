import * as language from '../actions/language';

export interface State {
  availableLangs: Array<string>;
  selectedLang: string;
}

const initialState: State = {
  availableLangs: [
    'en',
    'es',
    'de',
    'fr'
  ],
  selectedLang: 'en'
};

export function reducer(state = initialState, action: language.Actions): State {
  switch (action.type) {
    case language.CHANGE_LANGUAGE: {
      return {
        availableLangs: state.availableLangs,
        selectedLang: action.payload
      };
    }
    case language.LOAD_LANGUAGES: {
      return initialState;
    }
    default: {
      return initialState;
    }
  }
}

export const getAvailableLanguages = (state: State) => state.availableLangs;

export const getSelectedLang = (state: State) => state.selectedLang;
