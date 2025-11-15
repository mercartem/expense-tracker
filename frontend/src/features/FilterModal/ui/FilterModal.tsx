import { useTranslation } from 'react-i18next';
import { Button, Drawer } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Filter, { IFilterProps } from '../../Filter/Filter';

export default function FilterModal({ handleApply, handleReset }: IFilterProps) {
  const [state, setState] = useState(false);
  const { t } = useTranslation();
  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState(isOpen);
  };

  return (
    <>
      {window.innerWidth <= 1100 && window.innerWidth >= 770 && (
        <Button
          variant='contained'
          sx={{ fontSize: 12, padding: 1, minWidth: 75 }}
          onClick={toggleDrawer(true)}
        >
          {t('button.filter')}
        </Button>
      )}
      {window.innerWidth < 770 && (
        <Button sx={{ position: 'fixed', right: 0, top: 5, zIndex: '101'  }} onClick={toggleDrawer(true)}>
          <TuneIcon sx={{ color: 'white', width: 30, height: 30}} />
        </Button>
      )}
      <Drawer
        anchor='right'
        open={state}
        onClose={toggleDrawer(false)}
        transitionDuration={{ enter: 800, exit: 500 }}
      >
        <CloseIcon sx={{ position: 'fixed', right: 10, top: 10, zIndex: '101', ':hover': { cursor: 'pointer' }}} onClick={toggleDrawer(false)}/>
        <Filter handleApply={handleApply} handleReset={handleReset} />
      </Drawer>
    </>
  );
}
