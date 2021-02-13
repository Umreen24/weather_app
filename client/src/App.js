import React from "react";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_BASE_URL,
};

function App() {
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

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search" />
        </div>
        <div className="date">{dateBuilder(new Date())}</div>
        <br />
        <div className="location-box">
          <div className="location">Default Location</div>
          <hr className="location-line" />
          <br />
          <div className="weather-box-container">
            <div className="weather-box">
              <div id="default-temp">
                <span>70</span>
              </div>
              <span id="default-city">New York</span>
              <span id="default-country">United States</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
