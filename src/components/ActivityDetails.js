import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";

function ActivityDetails(props) {
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");

  const [liked, setLiked] = useState(false);

  const [activity, setActivity] = useState(null);
  const { activityId } = useParams();
  const navigate = useNavigate();

  /*   const getActivity = () => {
    axios
      .get(`${API_URL}/api/activities/${activityId}`)
      .then((response) => {
        const oneActivity = response.data;
        setActivity(oneActivity);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getActivity();
  }, []); */

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneActivity = response.data;
        setActivity(oneActivity);

        setLiked(oneActivity.isLiked);
        setType(oneActivity.type);
        setTime(oneActivity.time);
        setSpace(oneActivity.space);
        setNeighborhood(oneActivity.neighborhood);
        setName(oneActivity.name);
        setDescription(oneActivity.description);
        setAddress(oneActivity.address);
        setMapsLink(oneActivity.mapsLink);
      })
      .catch((error) => console.log(error));
  }, [activityId]);

  const handleFormSubmit = (e) => {
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

    // PUT request to update the project
    axios
      .put(`${API_URL}/api/activities/${activityId}`, requestBody)
      .then((response) => {
        // Once the request is resolved and the activity is updated, navigate back to filter
        navigate(`/activitysearch`);
      });
  };

  const deleteActivity = () => {
    // Make a DELETE request to delete the project
    axios
      .delete(`${API_URL}/api/activities/${activityId}`)
      .then(() => {
        // Once the request is resolved and the activity is updated, navigate back to filter
        navigate(`/activitysearch`);
      })
      .catch((err) => console.log(err));
  };

  const handleLike = () => {
    // Perform the "like" action
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/like/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Update the liked state
        setLiked(!liked);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!activity) {
    return (
      <div>
        <h1>No hay activities</h1>
      </div>
    );
  }

  return (
    <div className="Activity Details">
      <h3>Activity Details</h3>
      <h3>{activity.name}</h3>
      <button onClick={handleLike}>{liked ? "Liked" : "Like"}</button>

      <form onSubmit={handleFormSubmit}>
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

      <button onClick={deleteActivity}>Delete activity</button>
    </div>
  );
}

export default ActivityDetails;
