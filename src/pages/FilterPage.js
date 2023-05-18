import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import ListItemLike from "../components/ListItemLike";

// Styling Material UI
/* import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox"; */
import {
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { SelectType } from "../components/SelectType";
import { SelectTime } from "../components/SelectTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";

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

// Input
const spaces = ["", "Indoor", "Outdoor"];
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

function ActivityFilterPage() {
  const [type, setType] = useState([]);
  const [time, setTime] = useState([]);
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState([]);

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/filter`, {
        params: { type, time, space, neighborhood },
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.log(error));
  }, [type, time, space, neighborhood]);

  return (
    <div className="container-all">
      <h1>Activity Filter</h1>
      <Grid container spacing={2}>
        {/* select indoor/outdoor */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Indoor/Outdoor
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={space}
              label="Indoor/Outdoor"
              onChange={(e) => {
                setSpace(e.target.value);
              }}
            >
              {spaces.map((spaceMap) => {
                return (
                  <MenuItem key={spaceMap} value={spaceMap.toLowerCase()}>
                    {spaceMap || "All"}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        {/* select type activity */}
        <Grid item xs={12} sm={6} md={3}>
          <SelectType value={type} setValue={setType} />
        </Grid>

        {/* select time activity */}
        <Grid item xs={12} sm={6} md={3}>
          <SelectTime value={time} setValue={setTime} />
        </Grid>

        {/* select time neighborhood */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">
              Neighborhood
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={neighborhood}
              onChange={(e) => {
                setNeighborhood(e.target.value);
              }}
              input={<OutlinedInput label="Neighborhood" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {neighborhoods.map((neighborhoodMap) => (
                <MenuItem key={neighborhoodMap} value={neighborhoodMap}>
                  <Checkbox
                    checked={neighborhood.indexOf(neighborhoodMap) > -1}
                  />
                  <ListItemText primary={neighborhoodMap || "All"} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Show filtered activities */}

      <div className="activity-filter-list">
        <List>
          {activities.map((activity, index) => {
            return <ListItemLike activity={activity} key={index} />;
          })}
        </List>
      </div>
    </div>
  );
}

export default ActivityFilterPage;
