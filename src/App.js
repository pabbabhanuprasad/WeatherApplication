import React, { useState } from "react";
import "./App.css";
import { WiHumidity } from "react-icons/wi";
import { WiDayWindy } from "react-icons/wi";

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
        <div>
          <br />
          <br />

          <h3 className="title">Weather App</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            style={{
              marginTop: "20px",
              width: "280px",
              height: "40px",
              backgroundColor: "white",
              border: "none",
              borderRadius:"10px"
            }}
            type="text"
            value={city}
            name="city"
            placeholder="Enter a city name"
            onChange={handleChange}
          />
          <br />
          <br />

          <button
            style={{
              width: "10%",
              height: "40px",
              fontSize: "16px",
              border:"none",
              backgroundColor:"blue",
              borderRadius:"10px",
              color:"white"
            }}
            type="submit"
          >
            Check
          </button>
          <br />
          <br />
          <p className="para1">Description: {desc}</p>
          <p className="para2">
            <WiDayWindy /> Speed: {speed}
          </p>
          <p className="para3">
            <WiHumidity /> Humidity: {humidity}
          </p>
        </form>
        <h2 className="heading">{temp}</h2>
      </center>
    </div>
  );
};
export default App;
