import React, { useState } from 'react';
import { Box} from '@mui/material';
import TabsPanel from './TabsPanel';

export default function BasicTabs() {
  const [value, setValue] = useState(0);
 const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box>
        <TabsPanel
           value={value}
          handleChange={handleChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Box>
  );
}

