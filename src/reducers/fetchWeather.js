import {
  FETCH_WEATHER_LOCATION,
  SET_WEATHER_ERROR
} from "../actions/fetchWeather";
import createReducer from "../utils/createReducer";

const initialState = {
  weather: [],
  weatherErrors: []
};
export default createReducer(initialState, {
  [FETCH_WEATHER_LOCATION]: (state, action) => ({
    ...state,
    weather: [...state.weather, action.payload]
  }),
  [SET_WEATHER_ERROR]: (state, action) => ({
    ...state,
    weatherErrors: action.payload
  })
});
