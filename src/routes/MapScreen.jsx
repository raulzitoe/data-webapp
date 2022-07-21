import Map from "../components/Map";
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import React, { useState } from "react";

function MapScreen() {
  const [radioChoice, setRadioChoice] = useState('Clicks');

  const handleChange = (event) => {
    setRadioChoice(event.target.value);
  };


  return (
    <div>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Metric</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={radioChoice}
      >
        <FormControlLabel value="Impressions" control={<Radio />} label="Impressions" />
        <FormControlLabel value="Clicks" control={<Radio />} label="Clicks" />
        <FormControlLabel value="Revenue" control={<Radio />} label="Revenue" />
        <FormControlLabel value="Events" control={<Radio />} label="Events" />
      </RadioGroup>
    </FormControl>
      <Map radioChoice={radioChoice} />
    </div>
  
  )
}

export default MapScreen;
