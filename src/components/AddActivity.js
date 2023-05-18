import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import { useSnackbar } from "notistack";

// Material UI
import {
  Button,
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
import SaveIcon from "@mui/icons-material/Save";

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

function AddActivity(props) {
  const [type, setType] = useState([]);
  const [time, setTime] = useState([]);
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const spaces = ["indoor", "outdoor"];

  const neighborhoods = [
    "Brandenburg",
    "Charlottenburg",
    "Friedrichshain",
    "Kreuzberg",
    "Köpenick",
    "Lichtenberg",
    "Moabit",
    "Marzahn",
    "Mitte",
    "Neukölln",
    "Pankow",
    "Prenzlauer Berg",
    "Tempelhof",
    "Treptow",
    "Reinickendorf",
    "Schöneberg",
    "Spandau",
    "Steglitz",
    "Wedding",
    "Wilmersdorf",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

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
      .post(`${API_URL}/api/activities`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setDescription("");
        setAddress("");
        setMapsLink("");
        setNeighborhood("");
        setType([]);
        setTime([]);
        setSpace("");

        props.onCreateSuccess?.();

        enqueueSnackbar("Added activity", { variant: "success" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-all">
      <div className="crud-title">
        <h1>Add a new activity</h1>
      </div>

      <form onSubmit={handleSubmit} autocomplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name activity/place"
              variant="outlined"
              name="Name activity"
              // helperText="Some important text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description activity"
              variant="outlined"
              name="Description activity"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Maximum 12 words."
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SelectType value={type} setValue={setType} />
          </Grid>

          <Grid item xs={12} md={6}>
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
                    <Checkbox
                      checked={neighborhood.indexOf(neighborhoodMap) > -1}
                    />
                    <ListItemText primary={neighborhoodMap || "All"} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Link to Google Maps"
              variant="outlined"
              name="mapsLink"
              value={mapsLink}
              onChange={(e) => setMapsLink(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SelectTime value={time} setValue={setTime} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Indoor/Outdoor
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={space}
                onChange={(e) => {
                  setSpace(e.target.value);
                }}
                input={<OutlinedInput label="Indoor/Outdoor" />}
                renderValue={(selected) => selected}
                MenuProps={MenuProps}
              >
                {spaces.map((spaceMap) => (
                  <MenuItem key={spaceMap} value={spaceMap}>
                    <Checkbox checked={space.indexOf(spaceMap) > -1} />
                    <ListItemText primary={spaceMap} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          className="activity-buttons"
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              color="primary"
            >
              Save activity
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddActivity;
