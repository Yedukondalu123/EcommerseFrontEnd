import React from 'react';
import { Card, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ searchTerm, setSearchTerm, handleSearchClick }) {
  const handleSearchTermChange = (event) => {
    console.log(event.target.value)
    const searchValue = event.target.value;
    setSearchTerm(searchValue, handleSearchClick);
  };

  return (
    <Card
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        marginTop: '20px',
        width: '100%', 
        maxWidth: '1000px',
      }}
    >
      <TextField
        placeholder="Search by Order ID, Customer, or Delivery Status"
        variant="outlined"
        size="small"
         value={searchTerm}
        onChange={handleSearchTermChange}
        style={{ flex: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Card>
  );
}

export default SearchBar;
