import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material'
import * as Styled from './styles'

export type ToggleProps = {
  isActive: boolean
  onClick?: () => void
  label?: string
  disabled?: boolean
  confirmationRequired?: boolean
  confirmationButtonLabel?: string
  declineButtonLabel?: string
  confirmationTitle?: string
  confirmationDescription?: string
}

const Toggle = ({
  label,
  isActive = false,
  onClick,
  disabled = false,
  confirmationRequired = false,
  confirmationButtonLabel = 'Accept',
  declineButtonLabel = 'Decline',
  confirmationTitle,
  confirmationDescription,
}: ToggleProps) => {
  const [openConfirmation, setOpenConfirmation] = useState(false)

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false)
  }

  const handleClick = () => {
    if (disabled) {
      return
    }
    if (confirmationRequired) {
      if (openConfirmation) {
        handleCloseConfirmation()
        if (onClick) onClick()
      } else {
        setOpenConfirmation(true)
      }
      return
    }
    if (onClick) onClick()
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        {label && <Typography>{label}</Typography>}
        <Box display="flex" ml={label ? 2 : 0}>
          <Styled.ToggleInput
            id="switch"
            type="checkbox"
            name="switch"
            style={{ margin: 0 }}
          />
          <Styled.ToggleLabel
            isActive={isActive}
            style={{ margin: 0 }}
            htmlFor="switch"
            onClick={handleClick}
            disabled={disabled}
          />
        </Box>
      </Box>
      {confirmationRequired && (
        <Dialog
          data-testid="dialog"
          open={openConfirmation}
          onClose={handleCloseConfirmation}
          PaperProps={{ sx: { bgcolor: 'white' } }}
        >
          <DialogTitle>{confirmationTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{confirmationDescription}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation}>
              {declineButtonLabel}
            </Button>
            <Button onClick={handleClick}>{confirmationButtonLabel}</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default Toggle
