import {
  GET_TRIPS,
  TRIPS_ERROR,
  GET_TRIP,
  CREATE_TRIP,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  ADD_PASSENGER,
  GET_SEARCH
} from "../actions/actionTypes";

const initialState = {
  trips: [],
  trip: null,
  loading: true,
  error: {}
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRIPS:
      return {
        ...state,
        trips: action.payload,
        loading: false
      };
    case TRIPS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_TRIP:
      return {
        ...state,
        trip: action.payload,
        loading: false
      };
    case CREATE_TRIP:
      return {
        ...state,
        trips: [...state.trips, action.payload],
        loading: false
      };
    case CREATE_COMMENT:
      return {
        ...state,
        trip: { ...state.trip, comments: action.payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state.trip,
        comments: state.trip.comments.filter(
          comment => comment._id !== action.payload
        ),
        loading: false
      };
    case ADD_PASSENGER:
      return {
        ...state,
        trip: { ...state.trip, passengers: action.payload },
        loading: false
      };
    case GET_SEARCH:
      return {
        ...state,
        trips: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default trips;
