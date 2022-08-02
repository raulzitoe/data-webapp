import Map from "../components/Map";
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import React, { useState } from "react";
import { Card } from "react-bootstrap";

function MapScreen() {
  const [radioChoice, setRadioChoice] = useState('Clicks');

  const handleChange = (event) => {
    setRadioChoice(event.target.value);
  };


  return (
    <div className="bg-primary pt-1 pb-1 p-lg-5">
      <Card className="shadow-lg mx-auto" style={{height: '100%'}}>
      <FormControl className="mx-auto">
      <FormLabel className="mx-auto mt-2"><h4>Metric</h4></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={radioChoice}
        className="m-1 mx-auto"
      >
        <FormControlLabel className="m-1 mx-auto" value="Impressions" control={<Radio />} label="Impressions" />
        <FormControlLabel className="m-1 mx-auto" value="Clicks" control={<Radio />} label="Clicks" />
        <FormControlLabel className="m-1 mx-auto" value="Revenue" control={<Radio />} label="Revenue" />
        <FormControlLabel className="m-1 mx-auto" value="Events" control={<Radio />} label="Events" />
      </RadioGroup>
    </FormControl>
    <div className="pb-5">
      <Map radioChoice={radioChoice}/>
    </div>
      
      </Card>
    </div>
  
  )
}

export default MapScreen;
