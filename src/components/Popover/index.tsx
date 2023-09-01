import Popover from "@mui/material/Popover";
import * as React from "react";

interface BasicPopoverProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: any;
}

const BasicPopover: React.FC<BasicPopoverProps> = ({
  isOpen,
  anchorEl,
  onClose,
  children,
}) => {
  const id = isOpen ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          marginLeft: "-30px",
          marginTop: "12px",
          cursor: "pointer",
        }}
        PaperProps={{ sx: { borderRadius: "14px" } }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default BasicPopover;
