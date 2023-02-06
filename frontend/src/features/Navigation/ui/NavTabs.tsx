import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useLocation } from 'react-router-dom';
import LinkTab from './LinkTab';

function NavTabs() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [value, setValue] = React.useState(() => {
    switch (currentPath) {
      case '/user/dashboard':
        return 0;
      case '/user/transactions':
        return 1;
      case '/user/settings':
        return 2;
      default:
        return 0;
    }
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs className='navbar_nav' value={value} onChange={handleChange} orientation='vertical'>
        <LinkTab label='Dashboard' href='/user/dashboard' />
        <LinkTab label='Transactions' href='/user/transactions' />
        <LinkTab label='Settings' href='/user/settings' />
      </Tabs>
    </Box>
  );
}

export default NavTabs;
