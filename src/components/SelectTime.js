import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

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

const times = ["All", "morning", "afternoon", "evening", "night"];

export const SelectTime = (props) => {
  const selectTimes = props.withAll ? times : times.slice(1);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">Time of the day</InputLabel>
      <Select
        disabled={props.disabled}
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
        input={<OutlinedInput label="Time of the day" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {selectTimes.map((timeMap) => (
          <MenuItem key={timeMap} value={timeMap}>
            <Checkbox checked={props.value?.indexOf(timeMap) > -1} />
            <ListItemText primary={timeMap || "All"} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
