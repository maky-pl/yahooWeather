import React, { Component } from "react";
import "../../App.css";
import "../../assets/css/ionicons.min.css";
import { ActionCreators } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWeatherIcon } from "./getWeatherIcon";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: [],
      location: "Paris",
      initialWeather: "",
      loading: false
      // units: "c"
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      weather: props.weather.weather,
      loading: false
    });
  }
  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.fetchWeather(this.state.initialWeather);
    this.setState({
      weather: this.props.weather.weather,
      loading: false
    });
  }
  addLocation = async () => {
    this.setState({ loading: true });
    await this.props.fetchWeather(this.state.location);
    this.setState({ location: "", loading: false });
  };
  handleChange = event => {
    this.setState({ location: event.target.value });
  };
  render() {
    return (
      <div>
        <div className="container-input">
          <p className="info-cities">
            Type your favorite location or use one form provided cities.
            <br />
            <label>
              Display temperature in Fahrenheit?
              <input type="checkbox" id="units" />
            </label>
          </p>
        </div>
        <div className="container-input">
          <div className="container__item">
            <div className="form">
              <input
                type="text"
                className="form__field"
                placeholder="Search weather forecast"
                onChange={this.handleChange}
                value={this.state.location}
              />
              <button
                type="button"
                className="btn btn--primary btn--inside uppercase"
                onClick={this.addLocation}
              >
                Show
              </button>
              <div className="radio-buttons">
                <label>
                  Dublin
                  <input
                    id="dublin"
                    value="Dublin"
                    name="city"
                    type="radio"
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  New York
                  <input
                    id="newyork"
                    value="New York"
                    name="city"
                    type="radio"
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  London
                  <input
                    id="london"
                    value="London"
                    name="city"
                    type="radio"
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </div>
            {this.state.loading && (
              <div className="searching">
                <span>Searching...</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="display animated">
            {this.state.weather.map((weather, index) => {
              return (
                <div className="container-widget" key={index}>
                  <div className="header-widget">
                    <div className="time-container">
                      <span className="place-text">
                        Today in&nbsp;
                        {`${weather.location.city} -  ${
                          weather.location.country
                        }`}
                        ({weather.lastBuildDate.substring(16, 26)})
                      </span>
                    </div>
                  </div>
                  <div className="content-widget">
                    <div className="day-weather-active border-right">
                      <div className="day-weather-left">
                        <span className="day-text-active">
                          {weather.item.condition.temp}&deg;
                        </span>
                        <span className="day-text-active-sm">
                          {weather.lastBuildDate.substring(0, 16)}
                        </span>
                      </div>
                      <div className="day-weather-right">
                        <span className="day-icon-active">
                          <i
                            className={getWeatherIcon(
                              parseInt(weather.item.condition.code)
                            )}
                          />
                        </span>
                        <span className="wea-text-active">
                          {`${weather.wind.speed}${weather.units.speed}`}
                        </span>
                      </div>
                    </div>
                    {weather.item.forecast.slice(1, 4).map((item, i) => {
                      return (
                        <div className="day-weather border-right" key={i}>
                          <span className="day-text">{item.day}</span>
                          <span className="day-icon">
                            <i
                              className={getWeatherIcon(parseInt(item.code))}
                            />
                          </span>
                          <span className="day-text">{item.high}&deg;</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = ({ weather }) => {
  return {
    weather
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
