import React, { useState } from "react";
import axios from "axios";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_BASE_URL,
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [forecast, setForecast] = useState("");

  const weatherURL = `${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`;
  const forecastURL = `${api.base}onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&APPID=${api.key}`;

  const search = async (event) => {
    if (event.key === "Enter") {
      try {
        let res = await axios.get(weatherURL);
        setWeather(res.data);
        setLat(res.data.coord.lat);
        setLon(res.data.coord.lon);
        getForecast();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getForecast = async () => {
    if (lat && lon) {
      try {
        let forecastRes = await axios.get(forecastURL);
        setForecast(forecastRes.data);
        console.log(forecastRes.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
  };

  // Going to try to create conditional styling based on time to show different
  // backgrounds on default location box
  //const time = new Date().toLocaleTimeString();

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="date">Today: {dateBuilder(new Date())}</div>
        <br />
        <br />
        <div className="location-box">
          <div className="location">Location</div>
          <hr className="location-line" />
          <br />
          <div className="weather-box-container">
            {typeof weather.main != "undefined" ? (
              <div
                className={
                  typeof weather.main != "undefined"
                    ? weather.main.temp > 60
                      ? "weather-box-warm"
                      : "weather-box"
                    : "weather-box"
                }
              >
                <div id="default-temp">
                  <span>{Math.round(weather.main.temp)}°F</span>
                </div>
                <div className="default-weather">
                  <span>{weather.weather[0].main}</span>
                </div>
                <span id="default-city">{weather.name}</span>
                <span id="default-country">{weather.sys.country}</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className="forecast-box">
            <div className="forecast">
              2-Day Forecast
              <button onClick={getForecast()} className="get-forecast">
                Get
              </button>
            </div>
            <div className="forecast-box-container">
              {typeof forecast.daily != "undefined" ? (
                <div className="forecast-circle-container">
                  <div className="forecast-circle"></div>
                  <div className="forecast-circle"></div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
