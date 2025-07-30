import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ShortenerStats = () => {
  const keys = Object.keys(localStorage);
  const items = keys.map(key => {
    try {
      return { shortcode: key, ...JSON.parse(localStorage.getItem(key)) };
    } catch {
      return null;
    }
  }).filter(Boolean);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Shortened URL Statistics</Typography>
      {items.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>Shortcode: {item.shortcode}</Typography>
            <Typography>URL: {item.longUrl}</Typography>
            <Typography>Expiry: {new Date(item.expiry).toLocaleString()}</Typography>
            <Typography>Clicks: {item.clicks.length}</Typography>
            {item.clicks.map((click, i) => (
              <Typography key={i} sx={{ pl: 2 }}>
                Time: {click.time}, Source: {click.source}, Location: {click.location}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ShortenerStats;
