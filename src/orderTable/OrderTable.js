import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

const getStatusStyles = (status) => {
  switch (status) {
    case 'Completed':
      return { color: '#4caf50', hoverColor: '#388e3c' }; // Green
    case 'Continuing':
      return { color: '#ff9800', hoverColor: '#f57c00' }; // Orange
    case 'Restitute':
      return { color: '#2196f3', hoverColor: '#1976d2' }; // Blue
    case 'Canceled':
      return { color: '#f44336', hoverColor: '#d32f2f' }; // Red
    default:
      return { color: '#000', hoverColor: '#000' }; 
  }
};

const OrderTable = ({ rows }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
            <TableCell sx={{ fontWeight: 700  }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: 700  }}>Order</TableCell>
            <TableCell sx={{ fontWeight: 700  }}>Delivery Date</TableCell>
            <TableCell sx={{ fontWeight: 700  }}>Delivery Pricing</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Delivery Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.orderId}
                onClick={() => handleRowClick(row.orderId)}
                sx={{
                  backgroundColor: selectedRow === row.orderId ? '#e0e0e0' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    '& > *': {
                      fontWeight: 'bold',
                      color: 'black',
                    },
                  },
                }}
              >
                <TableCell sx={{ borderBottom: 'none' }}>{row.orderId}</TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>{row.customer}</TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>{row.order}</TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>{row.deliveryDate}</TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>
  {`$${row.deliveryPricing.toFixed(2).replace('.', ',')}`}
</TableCell>

                <TableCell sx={{ borderBottom: 'none' }}>
                  <Chip
                    label={row.deliveryStatus}
                    sx={{ 
                      ...getStatusStyles(row.deliveryStatus),
                      fontWeight: 'bold',
                      borderRadius: 0,
                      width: '100px',
                      height: '30px',
                      display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                      border: `1px solid ${getStatusStyles(row.deliveryStatus).color}`,
                      backgroundColor: '#f5f5f5',
                      '&:hover': {
                        backgroundColor: getStatusStyles(row.deliveryStatus).hoverColor,
                        color: 'white',
                        cursor: 'pointer',
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: 'center', borderBottom: 'none' }}>No matching records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
