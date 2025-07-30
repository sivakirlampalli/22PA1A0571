// src/components/ShortenerStats.jsx

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
} from '@mui/material';

const dummyStats = [
  {
    id: '1',
    shortUrl: 'https://sho.rt/abc123',
    originalUrl: 'https://example.com/very-long-url-1',
    clicks: 34,
  },
  {
    id: '2',
    shortUrl: 'https://sho.rt/xyz789',
    originalUrl: 'https://example.com/another-very-long-url',
    clicks: 87,
  },
];

const ShortenerStats = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        🔍 Shortened URLs Stats
      </Typography>

      <Grid container spacing={2}>
        {dummyStats.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {item.shortUrl}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Original: <br />
                  <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                    {item.originalUrl}
                  </a>
                </Typography>
                <Chip
                  label={`Clicks: ${item.clicks}`}
                  color="secondary"
                  sx={{ marginTop: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShortenerStats;
