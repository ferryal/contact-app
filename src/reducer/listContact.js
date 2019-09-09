import { LISTCONTACT } from '../actions/ActionTypes';

const initialState = {
  loading: false,
	listContact: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTCONTACT.LOADING:
      return {
        ...state,
        loading: true
      };
    case LISTCONTACT.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
				listContact: action.payload.data
      };
    case LISTCONTACT.FETCH_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
