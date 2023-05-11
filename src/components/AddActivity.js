import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config";

function AddActivity(props) {
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      type,
      time,
      space,
      neighborhood,
      name,
      description,
      address,
      mapsLink,
    };

    axios
      .post(`${API_URL}/api/activities`, requestBody)
      .then((response) => {
        setName("");
        setDescription("");
        setAddress("");
        setMapsLink("");
        setNeighborhood("");
        setType("");
        setTime("");
        setSpace("");

        // props.refreshActivities();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Activity Details">
      <h3>Add Activity</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Google Maps Link:</label>
        <input
          type="text"
          name="mapsLink"
          value={mapsLink}
          onChange={(e) => setMapsLink(e.target.value)}
        />

        <label>Neighborhood:</label>
        <input
          type="text"
          name="neighborhood"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />

        <label>Time:</label>
        <input
          type="text"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <label>Space:</label>
        <input
          type="text"
          name="space"
          value={space}
          onChange={(e) => setSpace(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddActivity;
