import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Button, Divider} from '@mui/material';
import SearchBar from './SearchBar';
import OrderTable from '../../src/orderTable/OrderTable'; 
import Pagination from '../../src/orderTable/Pagination'; 
import FilterPopover from './FilterPopover'; 
import FilterListIcon from '@mui/icons-material/FilterList';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TabsPanel = ({ value, handleChange, searchTerm, setSearchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [startingRecord,setStartingRecord]=useState(1);
  const [endingRecord,setEndingRecord]=useState(1);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterApplied, setFilterApplied] = useState(false); 

  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [itemName, setItemName] = useState('');
  const [status, setStatus] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pricingRange, setPricingRange] = useState([0, 0]);
  const [price, setPrice] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (startDate === null && endDate === null) {
      setDateRange(null);
    } else if (startDate === null || endDate === null) {
      alert('Both start date and end date should be selected');
    } else if (startDate > endDate || startDate === endDate) {
      alert('Start date must be less than end date');
    } else {
      setDateRange(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (pricingRange[0] === 0 && pricingRange[1] === 0) {
      setPrice(null);
    } else {
      setPrice(`${pricingRange[0]}-${pricingRange[1]}`);
    }
  }, [pricingRange]);

  const fetchData = async (filter, page) => {
    const endpoint = `http://localhost:8080/headers?page=${page + 1}&headerFilter=${filter}`;
    console.log('Fetching data from:', endpoint);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Fetched data:', result); 
      setData(result.orderDetailsList || []);
      setTotalPages(result.paginationDetails.totalNumberOfPages || 1);
      setStartingRecord(result.paginationDetails.startingRecord || 1);
      setEndingRecord(result.paginationDetails.endingRecord ||1 );
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchData = async (searchTerm, page) => {
    const endpoint = `http://localhost:8080/globalSearches?surpriseText=${searchTerm}&page=${page + 1}`;
    console.log('Fetching data from:', endpoint);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Fetched data:', result);
      setData(result.orderDetailsList || []);
      setTotalPages(result.paginationDetails.totalNumberOfPages);
      setStartingRecord(result.paginationDetails.startingRecord || 1);
      setEndingRecord(result.paginationDetails.endingRecord ||1 );
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const filter = getFilter();
    if (searchTerm !== '') {
      fetchSearchData(searchTerm, page);
    } else if (filterApplied) {
      handleFilterSubmit();
    } else {
      fetchData(filter, page);
    }
  }, [value, page, searchTerm, filterApplied]);

  const getFilter = () => {
    switch (value) {
      case 0:
        return 'All Orders';
      case 1:
        return 'Completed';
      case 2:
        return 'Continuing';
      case 3:
        return 'Restitute';
      case 4:
        return 'Canceled';
      default:
        return 'All Orders';
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchClick = () => {
    setPage(0); // Reset page to 0 when a new search is made
  };

  const onTabChange = (event, newValue) => {
    handleChange(event, newValue);
    setPage(0); // Reset page to 0 when switching tabs
    setSearchTerm(''); // Clear the search term when switching tabs
    setFilterApplied(false); // Reset filter applied status when switching tabs
  };

  const handleFilterButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setFilterPopoverOpen(true);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setFilterPopoverOpen(false);
  };

  const handleFilterSubmit = async () => {
    const apiData = {
      orderId: orderId || '',
      customer: customerName || '',
      orderItem: itemName || '',
      deliveryDate: dateRange || '',
      deliveryPricing: price || null,
      status: status.length > 0 ? status : []
    };

    
    const endpoint = `http://localhost:8080/filters?page=${page+1}`;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API response:', result);
      setData(result.orderDetailsList || []);
      setTotalPages(result.paginationDetails.totalNumberOfPages || 1);
      setStartingRecord(result.paginationDetails.startingRecord || 1);
      setEndingRecord(result.paginationDetails.endingRecord ||1 );
      setFilterApplied(true); // Set filter applied to true
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }

    handleFilterClose();
  };

  const handleFilterReset = () => {
    setOrderId('');
    setCustomerName('');
    setItemName('');
    setStatus([]);
    setStartDate(null);
    setEndDate(null);
    setPricingRange([0, 0]);
    setFilterApplied(false); // Reset filter applied status when filters are reset
    handleFilterClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={onTabChange}>
        <Tab label="All Orders" />
        <Tab label="Completed" />
        <Tab label="Continuing" />
        <Tab label="Restitute" />
        <Tab label="Canceled" />
      </Tabs>
      <Divider sx={{ borderBottomWidth: 2, marginTop: '-2px' }} />

      <Box sx={{ padding: '3px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchClick={handleSearchClick}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}

            onClick={handleFilterButtonClick}
            sx={{
              marginRight: '15px',
              marginTop: '18px',
              textTransform: 'none', // Ensure text is not transformed (uppercase, etc.)
              padding: '5px 10px', // Adjust padding to match SearchBar button
              borderColor: 'primary.main', // Border color to match theme
              color: 'primary.main', // Text color to match theme
              '&:hover': {
                borderColor: 'primary.dark', // Darker border color on hover
                backgroundColor: 'primary.light', // Lighter background color on hover
              },
            }}
          >
            Filters
          </Button>
          <FilterPopover
            open={filterPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleFilterClose}
            orderId={orderId}
            setOrderId={setOrderId}
            customerName={customerName}
            setCustomerName={setCustomerName}
            itemName={itemName}
            setItemName={setItemName}
            status={status}
            setStatus={setStatus}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            pricingRange={pricingRange}
            setPricingRange={setPricingRange}
            handleSubmit={handleFilterSubmit}
            handleResetFilters={handleFilterReset}
          />
        </Box>
        <Box sx={{ marginTop: '20px' }}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && data.length === 0}
          {!loading && !error&& (
            <>
              <OrderTable rows={data} />
            
              <Pagination
                page={page}
                totalPages={totalPages}
                startingRecord={startingRecord}
                endingRecord={endingRecord}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
    

    </LocalizationProvider>
  );
};

export default TabsPanel;
