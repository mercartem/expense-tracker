import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import LinkTab from './LinkTab';

function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        className='navbar_nav'
        value={value}
        onChange={handleChange}
        aria-label='nav tabs example'
        orientation='vertical'
      >
        <LinkTab label='Dashboard' href='/dashboard' />
        <LinkTab label='Transactions' href='/transactions' />
        <LinkTab label='Settings' href='/settings' />
      </Tabs>
    </Box>
  );
}

export default NavTabs;
