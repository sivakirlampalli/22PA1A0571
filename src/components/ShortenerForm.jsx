import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { LoadingButton } from '@mui/lab';

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const generateRandomShortcode = () =>
  Math.random().toString(36).substring(2, 8);

const ShortenerForm = () => {
  const [urls, setUrls] = useState([
    { original: '', shortcode: '', validity: '', result: null, error: null },
  ]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAddField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { original: '', shortcode: '', validity: '', result: null, error: null }]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const updated = await Promise.all(
      urls.map(async (entry) => {
        const { original, shortcode, validity } = entry;

        if (!original || !isValidURL(original)) {
          return { ...entry, result: null, error: 'Invalid URL' };
        }

        // Simulate a call to backend
        const finalShortcode = shortcode || generateRandomShortcode();
        const expiresAt = new Date(Date.now() + (parseInt(validity || 30) * 60000));

        return {
          ...entry,
          result: {
            shortUrl: `http://localhost:3000/${finalShortcode}`,
            expiresAt: expiresAt.toLocaleString(),
          },
          error: null,
        };
      })
    );

    setUrls(updated);
    setLoading(false);
    setSnackbar({ open: true, message: 'Shortened successfully!', type: 'success' });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: 'Copied to clipboard!', type: 'info' });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        🔗 Interactive URL Shortener
      </Typography>

      {urls.map((entry, idx) => (
        <Paper
          key={idx}
          elevation={6}
          sx={{
            p: 3,
            my: 2,
            background: '#212121',
            borderLeft: '6px solid #ff9800',
            borderRadius: '12px',
          }}
        >
          <Typography variant="h6" gutterBottom>URL #{idx + 1}</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Original URL"
            value={entry.original}
            onChange={(e) => handleChange(idx, 'original', e.target.value)}
            error={entry.error}
            helperText={entry.error}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Preferred Shortcode (optional)"
            value={entry.shortcode}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Validity (minutes, optional - defaults to 30)"
            value={entry.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
          />

          {entry.result && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                🔗 {entry.result.shortUrl} <br />
                ⏳ Expires: {entry.result.expiresAt}
              </Typography>
              <Tooltip title="Copy to clipboard">
                <IconButton onClick={() => handleCopy(entry.result.shortUrl)}>
                  <ContentCopyIcon color="warning" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Paper>
      ))}

      <Box textAlign="center" my={3}>
        <Button
          onClick={handleAddField}
          disabled={urls.length >= 5}
          variant="outlined"
          sx={{ mr: 2 }}
        >
          ➕ Add Another URL
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
          color="warning"
        >
          Shorten All URLs
        </LoadingButton>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShortenerForm;
