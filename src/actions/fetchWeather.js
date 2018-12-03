import axios from "axios";
export const FETCH_WEATHER_LOCATION = "FETCH_WEATHER_LOCATION";
export const SET_WEATHER_ERROR = "SET_WEATHER_ERROR";
const API_URL =
  "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where ";

let unit = "";
export const fetchWeather = location => {
  return async dispatch => {
    try {
      // quick fix to show F vs C
      // TODO: this shwould be done with onChange and props via axios
      if (document.getElementById("units").checked) {
        unit = "f";
      } else {
        unit = "c";
      }
      const fetchLocation =
        API_URL +
        `text="${location}")and u='${unit.toLowerCase()}'&format=json`;
      const request = await axios.get(fetchLocation);
      dispatch({
        type: FETCH_WEATHER_LOCATION,
        payload: request.data.query.results.channel
      });
    } catch (err) {
      dispatch({
        type: SET_WEATHER_ERROR,
        err
      });
    }
  };
};
