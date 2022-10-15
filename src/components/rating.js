import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux';
import {addRatingProductDetail} from "../redux/action/getDataAction"



export default function BasicRating() {
  const [value, setValue] = useState(0);
  console.log(value,"this is star value here");
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addRatingProductDetail(value))
  },[value])
  
  
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend"></Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      {/* <Typography component="legend">Read only</Typography> */}
      {/* <Rating name="read-only" value={value} readOnly /> */}
      {/* <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
    </Box>
  );
}
