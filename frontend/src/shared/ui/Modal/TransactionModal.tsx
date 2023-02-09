import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IBasicModalProps {
  children: React.ReactNode;
}

export default function TransactionModal({ ...props }: IBasicModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant='contained'
        sx={{ fontSize: 12, padding: 1, minWidth: 150 }}
        onClick={handleOpen}
      >
        Add Transaction
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Transaction
          </Typography>
          <CloseIcon
            sx={{ position: 'absolute', top: '10px', right: '10px' }}
            onClick={handleClose}
          />
          {props.children}
          {/* <div>
            <Button
              variant='outlined'
              onClick={handleClose}
              sx={{ fontSize: 12, padding: 1, minWidth: 150, position: 'absolute', bottom: '52px', right: '32px' }}
            >
              Cancel
            </Button> */}
          {/* </div> */}
        </Box>
      </Modal>
    </div>
  );
}
