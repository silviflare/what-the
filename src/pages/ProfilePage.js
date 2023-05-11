import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";
import AddActivity from "../components/AddActivity";

function ProfilePage(props) {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const getUser = () => {
    // const storedToken = localStorage.getItem("authToken");

    axios
      .get(
        `${API_URL}/auth/profile/${userId}`
        // , {headers: { Authorization: `Bearer ${storedToken}` }, }
      )
      .then((response) => {
        const oneUser = response.data;
        setUser(oneUser);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-user">
      {user && (
        <>
          <h1>Hello! {user.name}</h1>
          <p>Your email is: {user.email}</p>
        </>
      )}

      {/*         <Link to={`/countries/${country.alpha3Code}`}>

        </Link> */}

      {/* Likes */}

      {/* <AddActivity /> */}

      {/* Map over the activities the user made */}
    </div>
  );
}

export default ProfilePage;
