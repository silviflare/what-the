import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";

// Material UI
import {
  Button,
  IconButton,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { SelectType } from "./SelectType";
import { SelectTime } from "./SelectTime";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Settings Material UI
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// ActivityDetails funtion

function ActivityDetails(props) {
  const [type, setType] = useState([]);
  const [time, setTime] = useState([]);
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

  const neighborhoods = [
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
        setType(oneActivity.type || []);
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
        navigate(`/activitysearch`);
      });
  };

  const deleteActivity = () => {
    // Make a DELETE request to delete the project
    axios
      .delete(`${API_URL}/api/activities/${activityId}`)
      .then(() => {
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

      <IconButton onClick={handleLike}>
        {liked ? (
          <FavoriteBorderIcon color="error" />
        ) : (
          <FavoriteIcon color="error" />
        )}
      </IconButton>

      <form onSubmit={handleFormSubmit}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name activity"
              variant="outlined"
              name="Name activity"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description activity"
              variant="outlined"
              name="Description activity"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectType value={type} setValue={setType} />
          </Grid>
          <Grid item xs={6}>
            {/*  <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Neighborhood
              </InputLabel>

               <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={neighborhood}
                defaultValue={neighborhood}
                label="Neighborhood"
                onChange={(e) => {
                  setSpace(e.target.value);
                }}
              >
                {neighborhoods.map((neighborhoodMap) => {
                  return (
                    <MenuItem
                      key={neighborhoodMap}
                      value={neighborhoodMap.toLowerCase()}
                    >
                      {neighborhoodMap || "All"}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl> */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Neighborhood
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={neighborhood}
                onChange={(e) => {
                  setNeighborhood(e.target.value);
                }}
                input={<OutlinedInput label="Neighborhood" />}
                renderValue={(selected) => selected}
                MenuProps={MenuProps}
              >
                {neighborhoods.map((neighborhoodMap) => (
                  <MenuItem key={neighborhoodMap} value={neighborhoodMap}>
                    <ListItemText primary={neighborhoodMap} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <TextField
              fullWidth
              id="outlined-basic"
              label="Neighborhood"
              variant="outlined"
              name="neighborhood"
              defaultValue={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            /> */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Link to Google Maps"
              variant="outlined"
              name="mapsLink"
              defaultValue={mapsLink}
              onChange={(e) => setMapsLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectTime value={time} setValue={setTime} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Indoor/Outdoor"
              variant="outlined"
              name="space"
              defaultValue={space}
              onChange={(e) => setSpace(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
          color="primary"
        >
          Update activity
        </Button>
      </form>

      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={deleteActivity}
      >
        Delete activity
      </Button>
    </div>
  );
}

export default ActivityDetails;
