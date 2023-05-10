import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function RandomActivity() {
  const [oneActivity, setActivity] = useState(null);
  // const { activityId } = useParams();

  const getRandomActivity = () => {
    axios
      .get(`${baseURL}/api/random-activity`)
      .then((response) => {
        const oneActivity = response.data;
        setActivity(oneActivity);
      })
      .catch((err) => console.log(err));
  };

  /*   useEffect(() => {
    axios.get(`/api/random-activity`).then((response) => {
      setActivity(response.data);
    });
  }, []); */

  return (
    <div className="random-activity">
      <button onClick={getRandomActivity}>
        What the f*** should I do today?
      </button>

      {oneActivity && <h2>{oneActivity.description}</h2>}

      {/*
        oder:
        <div className="activity-card">
          <div>
            <h3>{randomActivity.name}</h3>
            <h2>{randomActivity.description}</h2>
            <h3>{randomActivity.address}</h3>
            <h3>{randomActivity.mapsLink}</h3>
            <p>{randomActivity.type}</p>
            <p>{randomActivity.neighborhood}</p>
            <p>{randomActivity.space}</p>
            <p>{randomActivity.time}</p>
          </div>
        </div> */}
    </div>
  );
}

export default RandomActivity;
