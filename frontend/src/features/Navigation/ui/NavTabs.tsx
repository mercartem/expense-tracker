import { useTranslation } from 'react-i18next';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useLocation } from 'react-router-dom';
import LinkTab from './LinkTab';

function NavTabs() {
  const { t } = useTranslation();
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
      <Tabs className='navbar__nav' value={value} onChange={handleChange} orientation='vertical'>
        <LinkTab label={t('navigation.dash')} href='/user/dashboard' />
        <LinkTab label={t('navigation.transactions')} href='/user/transactions' />
        <LinkTab label={t('navigation.setting')} href='/user/settings' />
      </Tabs>
    </Box>
  );
}

export default NavTabs;
