import {
  FETCH_RESIDENT_SUCCESS,
  FETCH_RESIDENT_ERROR,
  UPDATE_RESIDENT_SUCCESS,
  UPDATE_RESIDENT_ERROR,
} from "../actions/actionTypes";

const initialState = {
  residentError: null,
  resident: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESIDENT_SUCCESS:
      return { ...state, resident: action.resident, residentError: null };
    case FETCH_RESIDENT_ERROR:
      return { ...state, residentError: action.error };
    case UPDATE_RESIDENT_SUCCESS:
      return { ...state, residentError: null };
    case UPDATE_RESIDENT_ERROR:
      return { ...state, residentError: action.error };
    default:
      return state;
  }
};

export default reducer;
