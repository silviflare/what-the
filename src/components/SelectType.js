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

const types = [
  "All",
  "food",
  "drinks",
  "exhibition",
  "party",
  "sport",
  "theater",
  "concert",
  "market",
  "tour",
  "shop",
  "market",
  "exploration",
];

export const SelectType = (props) => {
  const selectTypes = props.withAll ? types : types.slice(1);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">
        Type of activity
      </InputLabel>
      <Select
        required
        disabled={props.disabled}
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
        input={<OutlinedInput label="Type of activity" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {selectTypes.map((typeMap) => (
          <MenuItem key={typeMap} value={typeMap}>
            <Checkbox checked={props.value?.indexOf(typeMap) > -1} />
            <ListItemText primary={typeMap || "All"} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
