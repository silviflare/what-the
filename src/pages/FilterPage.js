import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";

const times = ["All", "morning", "afternoon", "evening", "night"];
const spaces = ["All", "indoor", "outdoor"];
const types = [
  "All",
  "food",
  "drinks",
  "exhibition",
  "tour",
  "park",
  "biergarten",
  "party",
  "drink",
  "market",
];

const neighborhoods = [
  "All",
  "Mitte",
  "Neukölln",
  "Friedrichshain",
  "Kreuzberg",
  "Charlottenburg",
  "Wilmersdorf",
  "Pankow",
  "Prenzlauer Berg",
  "Lichtenberg",
  "Tempelhof",
  "Schöneberg",
  "Treptow",
  "Köpenick",
  "Steglitz",
  "Marzahn",
  "Reinickendorf",
  "Spandau",
  "Brandenburg",
];

function ActivityFilterPage() {
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/filter`, {
        params: { type, time, space, neighborhood },
      })
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.log(error));
  }, [type, time, space, neighborhood]);

  return (
    <div>
      <h1>Activity Filter</h1>

      {/* select indoor/outdoor */}
      <label htmlFor="space">Indoor/Outdoor:</label>

      <select
        name="space"
        id="space"
        value={space}
        onChange={(e) => {
          setSpace(e.target.value === "All" ? "" : e.target.value);
        }}
      >
        <option value="" disabled hidden>
          All
        </option>
        {spaces.map((space) => {
          return (
            <option key={space} value={space}>
              {space}
            </option>
          );
        })}
      </select>

      {/* select type activity */}
      <label htmlFor="type">Select a type:</label>

      <select
        name="type"
        id="type"
        value={type}
        onChange={(e) => {
          setType(e.target.value === "All" ? "" : e.target.value);
        }}
      >
        {types.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>

      {/* select time activity */}
      <label htmlFor="time">Select a time:</label>

      <select
        name="time"
        id="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value === "All" ? "" : e.target.value);
        }}
      >
        {times.map((time) => {
          return (
            <option key={time} value={time}>
              {time}
            </option>
          );
        })}
      </select>

      {/* select time neighborhood */}
      <label htmlFor="neighborhood">Select a neighborhood:</label>

      <select
        name="neighborhood"
        id="neighborhood"
        value={neighborhood}
        onChange={(e) => {
          setNeighborhood(e.target.value === "All" ? "" : e.target.value);
        }}
      >
        {neighborhoods.map((neighborhood) => {
          return (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          );
        })}
      </select>

      {/* Show filtered activities */}
      <h2>Activities</h2>
      {activities.map((activity, index) => {
        return (
          <div key={index}>
            <Link to={`/activities/${activity._id}`}>
              <p>{activity.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityFilterPage;
