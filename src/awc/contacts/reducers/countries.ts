import { Country } from '../models/country';
import * as countries from '../actions/countries';
export interface State {
  loaded: boolean;
  loading: boolean;
  entities: {[id: number]: Country };
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: {}
};

export function reducer(state = initialState, action: countries.Actions): State {
  switch (action.type) {
    case countries.LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case countries.LOAD_SUCCESS: {
      const countriesList: Country[] = action.payload;
      const reducedCountries: { [id: string]: Country } = countriesList.reduce((countrs: { [id: string]: Country }, countr: Country) => {
        return Object.assign(countrs, {
            [countr.code]: countr
        });
    }, {});

      return {
        entities: reducedCountries,
        loading: false,
        loaded: true
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCountries = (state: State) => {
  return Object.keys(state.entities).map(value => state.entities[value]);
};

export const getCountryByCode = (state: State, countryCode: string) => {
  return state.entities[countryCode];
};
