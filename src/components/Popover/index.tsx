import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

interface BasicPopoverProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const BasicPopover: React.FC<BasicPopoverProps> = ({ isOpen, anchorEl, onClose }) => {
  const id = isOpen ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
};

export default BasicPopover;
