import { Contact } from '../models/contact';
import * as collection from '../actions/collection';
export interface State {
  loaded: boolean;
  loading: boolean;
  entities: {[id: number]: Contact };
  selectedEntry: number;
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: {},
  selectedEntry: null
};

const sortContacts = (contacts: Contact[], propertyName) => {
  return contacts
    .sort( (a: Contact, b: Contact) => {
      if (a[propertyName].toUpperCase() < b[propertyName].toUpperCase()) {
        return -1;
      }
      if (a[propertyName].toUpperCase() > b[propertyName].toUpperCase()) {
        return 1;
      }
      return 0;
    });
};

export function reducer(state = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case collection.LOAD_SUCCESS: {
      const contacts: Contact[] = action.payload;
      const reducedContacts: { [id: string]: Contact } = contacts.reduce((conts: { [id: string]: Contact }, cont: Contact) => {
        return Object.assign(conts, {
            [cont.id]: cont
        });
    }, {});

      return {
        entities: reducedContacts,
        loading: false,
        loaded: true,
        selectedEntry: null
      };
    }

    case collection.SELECT_ITEM: {
      return {
        ...state,
        selectedEntry: action.payload
      };
    }

    case collection.DESELECT_ITEM: {
      return {
        ...state,
        selectedEntry: null
      };
    }

    case collection.LOAD_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case collection.LOAD_ITEM_SUCCESS: {
      const newEntities = Object.assign({}, state.entities);
      newEntities[action.payload.id] = action.payload;

      return {
        ...state,
        entities: newEntities,
        loading: false,
        loaded: true,
        selectedEntry: action.payload.id
      };
    }

    case collection.UPDATE_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case collection.UPDATE_ITEM_SUCCESS: {
      const newEntities = Object.assign({}, state.entities);
      newEntities[action.payload.id] = action.payload;

      return {
        ...state,
        entities: newEntities,
        loading: false,
        loaded: true,
        selectedEntry: action.payload.id
      };
    }

    case collection.CREATE_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case collection.CREATE_ITEM_SUCCESS: {
      const newEntities = Object.assign({}, state.entities);
      newEntities[action.payload.id] = action.payload;

      return {
        ...state,
        entities: newEntities,
        loading: false,
        loaded: true,
        selectedEntry: action.payload.id
      };
    }

    case collection.DELETE_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case collection.DELETE_ITEM_SUCCESS: {
      const newEntities = Object.assign({}, state.entities);
      delete newEntities[action.payload];

      return {
        ...state,
        entities: newEntities,
        loading: false,
        loaded: true,
        selectedEntry: null
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getContacts = (state: State) => {
  return sortContacts(<Contact[]>Object.values(state.entities), 'name');
};

export const getSelectedContact = (state: State) => {
  return (state.selectedEntry !== null) ? state.entities[state.selectedEntry] : null;
};
