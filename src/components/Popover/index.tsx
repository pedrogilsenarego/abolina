import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Colors } from '../../constants/pallette';

interface BasicPopoverProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: any
}

const BasicPopover: React.FC<BasicPopoverProps> = ({ isOpen, anchorEl, onClose, children }) => {
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
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ marginTop: '32px', cursor: "pointer" }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default BasicPopover;
