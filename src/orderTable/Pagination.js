import React from 'react';
import { Box, Typography, IconButton, MenuItem, Select } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Pagination = ({ page, totalPages, startingRecord, endingRecord, onPageChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
      <Typography variant="body2">
        {`${startingRecord} - ${endingRecord} of ${totalPages} Pages`}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ marginRight: 2 }}>
          The Page you are on
        </Typography>
        <Select
          value={page}
          onChange={(e) => onPageChange(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ 
            marginRight: 2, 
            width: '60px', // Adjust the width as needed
            height: '30px', // Adjust the height as needed
            fontSize: '14px' // Adjust the font size as needed
          }}
        >
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <MenuItem key={pageNumber} value={pageNumber}>
              {pageNumber + 1}
            </MenuItem>
          ))}
        </Select>
        <IconButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
