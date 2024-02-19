import React, { useState } from "react";
import "./App.css";
import { FaTint, FaWind } from "react-icons/fa";

let App = () => {
  let [city, setCity] = useState("");
  let [temp, setTemp] = useState("");

  const [speed, setNewSpeed] = useState(null);
  const [humidity, setNewHumidity] = useState(null);
  const [desc, setNewDesc] = useState(null);
 

  let handleChange = (e) => {
    setCity(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q= ${city}&appid=fd82e92bde6e2557b3e8f1451430ca6a`
    )
      .then((val) => val.json())
      .then((val) => {
        if (city === "") {
          alert("Enter city name");
        } else if (val.main && val.main.temp !== undefined) {
          let kelvin = val.main.temp;
          let celsius = kelvin - 273.15;
          console.log(val);
          setTemp(`${city} ${Math.round(celsius)}°C`);
          setNewHumidity(val.main.humidity);
          setNewSpeed(val.wind.speed);
          setNewDesc(val.weather[0].description);
          setCity("");
        } else {
          alert("Invalid response Or Enter a valid city Name");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again.");
      });
  };

  return (
    <div className="body">
      <center>
        <div className="title">
          <br />
          <br />
        
          <h3>Weather App</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            style={{ width: "280px", height: "40px", backgroundColor: "white" }}
            type="text"
            value={city}
            name="city"
            placeholder="Enter a city name"
            onChange={handleChange}
          />
          <br />
          <br />

          <button className="btn" type="submit">
            Get
          </button>
          <br />
          <p className="para1">Description: {desc}</p>
          <p className="para2">
            <FaWind /> Speed: {speed}
          </p>
          <p className="para3">
            <FaTint /> Humidity: {humidity}
          </p>
        </form>
        <h2 className="heading">{temp}</h2>
      </center>
    </div>
  );
};
export default App;
