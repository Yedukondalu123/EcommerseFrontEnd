import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Chip,
  Popover
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function FilterPopover({
  open,
  anchorEl,
  onClose,
  orderId,
  setOrderId,
  customerName,
  setCustomerName,
  itemName,
  setItemName,
  status=[],
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  pricingRange,
  setPricingRange,
  handleSubmit,
  handleResetFilters
}) {
  const isApplyDisabled = () => {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      return true;
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return true;
    }
    return false;
};


  return (
    <Popover sx={{
      position: 'fixed',
      overflowY: 'auto',
      maxHeight: '80vh', // Adjust to a reasonable width to fit the content
      padding: 2, // Add padding to the Popover if needed
      boxSizing: 'border-box', // Ensure padding is included in the element's total width and height
    }}
    id={open ? 'simple-popover' : undefined}
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right', 
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right', // Align the top of the popover with the top of the anchor element
    }}
    >
      <Box sx={{ padding: 2, width: 300 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <TextField
          label="Customer Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <TextField
          label="Order "
          variant="outlined"
          fullWidth
          margin="normal"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />


        <Typography variant="h6" gutterBottom>
          Delivery Date Range
        </Typography>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />

        <Typography variant="h6" gutterBottom>
          Delivery Pricing
        </Typography>
        <Slider
          value={pricingRange}
          onChange={(event, newValue) => setPricingRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={20}
          marks
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            multiple
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                ))}
              </Box>
            )}
          >
            {['Completed', 'Canceled', 'Continuing', 'Restitute'].map((statusOption) => (
              <MenuItem key={statusOption} value={statusOption}>
                <Checkbox checked={status.indexOf(statusOption) > -1} />
                <ListItemText primary={statusOption} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="outlined" onClick={handleSubmit} disabled={isApplyDisabled()}>Apply</Button>
          <Button variant="outlined" color="error" onClick={handleResetFilters}>Reset</Button>
        </Box>
      </Box>
    </Popover>
  );
}

export default FilterPopover;