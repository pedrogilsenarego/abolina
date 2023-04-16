import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import * as Styled from "./styles";

interface Config {
  maxWidth?: string;
  fullWidth?: boolean;
  select?: boolean;
  variant: "outlined";
  onChange?: any;
}
interface Props {
  maxWidth?: string;
  onAction?: any
  options: string[];
  initialValue: string;
  label: string
  confirmationRequired?: boolean
  confirmationTitle?: string
  confirmationDescription?: string
  declineButtonLabel?: string
  confirmationButtonLabel?: string

}

const Select = ({
  options,

  initialValue,
  onAction,
  label,
  maxWidth = "auto",
  confirmationRequired,
  confirmationTitle,
  confirmationDescription,
  declineButtonLabel,
  confirmationButtonLabel,
  ...otherProps
}: Props) => {
  const [selected, setSelected] = useState<any>(initialValue);
  const [openConfirmation, setOpenConfirmation] = useState(false)

  useEffect(() => {
    if (selected !== initialValue && !confirmationRequired)
      onAction(selected)
    if (selected !== initialValue && confirmationRequired) {
      setOpenConfirmation(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    setSelected(value);

  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false)
    setSelected(initialValue)

  }

  const handleConfirmation = () => {
    onAction(selected)
    setOpenConfirmation(false)
  }



  const configSelect: Config = {
    ...otherProps,
    select: true,
    maxWidth,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  return (
    <>
      <Tooltip arrow placement="top" title={label}>
        <Styled.TextField
          {...configSelect}
          InputLabelProps={{ shrink: false }}
          value={selected}

          maxWidth="80px"

        >
          {Object.keys(options).map((item: any, pos) => {
            return (
              <MenuItem key={pos} value={item}>
                {options[item]}
              </MenuItem>
            );
          })}
        </Styled.TextField>
      </Tooltip>
      {confirmationRequired && (
        <Dialog
          data-testid="dialog"
          open={openConfirmation}
          onClose={handleCloseConfirmation}
          PaperProps={{ sx: { bgcolor: 'white' } }}
        >
          <DialogTitle>{confirmationTitle || "Test"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{confirmationDescription || "Test"}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation}>
              {declineButtonLabel || "Test"}
            </Button>
            <Button onClick={handleConfirmation}>{confirmationButtonLabel || "Test"}</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Select;
