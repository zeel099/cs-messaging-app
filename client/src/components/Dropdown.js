import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export const DropDown = ({ label, menuItems, selectedId, setSelectedId }) => {
  const handleChange = (event) => {
    setSelectedId(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedId}
          label={label}
          onChange={handleChange}
        >
          {menuItems.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default DropDown;
