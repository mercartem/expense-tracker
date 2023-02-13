import React from 'react';
import {
  Button
} from '@mui/material';

function AddAvatar() {
  return (
    <div className='settings__avatar'>
      <Button
          variant='contained'
          sx={{ fontSize: 12, padding: 1, minWidth: 100 }}
        >
          Add Avatar
        </Button>
    </div>
  );
};

export default AddAvatar;
