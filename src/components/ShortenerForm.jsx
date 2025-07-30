import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { logEvent } from "../middleware/logger";

const ShortenerForm = () => {
  const [inputs, setInputs] = useState([{ longUrl: "", validity: "", customCode: "" }]);

  const handleChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index][e.target.name] = e.target.value;
    setInputs(newInputs);
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { longUrl: "", validity: "", customCode: "" }]);
    }
  };

  const handleSubmit = () => {
    inputs.forEach((input) => {
      if (!input.longUrl) return;
      let code = input.customCode || Math.random().toString(36).substring(2, 7);
      let data = JSON.parse(localStorage.getItem(code));
      if (data) {
        alert(`Shortcode ${code} already exists`);
        return;
      }
      const expiry = Date.now() + ((parseInt(input.validity) || 30) * 60000);
      const newData = { longUrl: input.longUrl, expiry, clicks: [] };
      localStorage.setItem(code, JSON.stringify(newData));
      logEvent("URL Shortened", { code, ...newData });
    });
    alert("URLs shortened successfully");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {inputs.map((input, index) => (
        <Box key={index} mb={2}>
          <TextField label="Long URL" name="longUrl" value={input.longUrl} onChange={(e) => handleChange(index, e)} fullWidth />
          <TextField label="Validity (min)" name="validity" value={input.validity} onChange={(e) => handleChange(index, e)} fullWidth />
          <TextField label="Custom Shortcode (optional)" name="customCode" value={input.customCode} onChange={(e) => handleChange(index, e)} fullWidth />
        </Box>
      ))}
      <Button variant="outlined" onClick={handleAdd}>Add More</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten</Button>
    </Box>
  );
};

export default ShortenerForm;
