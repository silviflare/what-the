import { useState, useEffect } from "react";

// Styling
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import { SelectType } from "../components/SelectType";
import { SelectTime } from "../components/SelectTime";

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

function Filters(props) {
  const [type, setType] = useState([]);
  const [time, setTime] = useState([]);
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState([]);

  /*   useEffect(() => {
    props.onChange({ type, time, space, neighborhood });
  }, [type, time, space, neighborhood, props]); */

  const handleType = (type) => {
    setType(type);
    props.onChange({ type, time, space, neighborhood });
  };

  const handleTime = (time) => {
    setTime(time);
    props.onChange({ type, time, space, neighborhood });
  };

  const handleSpace = (space) => {
    setSpace(space);
    props.onChange({ type, time, space, neighborhood });
  };

  const handleNeighborhood = (neighborhood) => {
    setNeighborhood(neighborhood);
    props.onChange({ type, time, space, neighborhood });
  };

  return (
    <Grid container spacing={2}>
      {/* select indoor/outdoor */}
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Indoor/Outdoor</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={space}
            label="Indoor/Outdoor"
            onChange={(e) => {
              handleSpace(e.target.value);
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
      <Grid item xs={3}>
        <SelectType value={type} withAll setValue={handleType} />
      </Grid>

      {/* select time activity */}
      <Grid item xs={3}>
        <SelectTime value={time} withAll setValue={handleTime} />
      </Grid>

      {/* select time neighborhood */}
      <Grid item xs={3}>
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
              handleNeighborhood(e.target.value);
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
  );
}

export default Filters;
