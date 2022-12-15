import { FunctionComponent, useState, useEffect } from 'react'
import {
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material'
import { TableListAction } from '../types'
import * as Styled from './styles'
import Toggle from '../../Inputs/Toggle'

interface ActionProps extends TableListAction {
  onClick: () => void;
}

export const Action: FunctionComponent<ActionProps> = ({
  label,
  buttonType = 'icon',
  confirmationDescription,
  confirmationRequired,
  confirmationTitle,
  disabled,
  isActive,
  icon,
  onClick,
  confirmationButtonLabel = 'Accept',
  declineButtonLabel = 'Decline',
}: ActionProps) => {
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [toggleDisabled, setToggleDisabled] = useState(true)

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false)

  }

  const handleClick = () => {
    if (disabled) { console.log("disabled"); return }
    if (confirmationRequired) {
      if (openConfirmation) {
        setToggleDisabled(!toggleDisabled)
        handleCloseConfirmation()
        onClick()
      } else {
        setOpenConfirmation(true)
      }
      return
    }
    onClick()
    setToggleDisabled(!toggleDisabled)
  }

  useEffect(() => {
    if (disabled || !isActive) setToggleDisabled(false)
  }, [disabled, isActive])

  return (
    <>
      <Tooltip arrow placement="top" title={label}>
        {buttonType === 'icon' ? (
          <Styled.IconButton onClick={handleClick}>
            {icon ?? null}
          </Styled.IconButton>
        ) : (
          <Box component="div">
            <Toggle isActive={toggleDisabled} onClick={handleClick} />
          </Box>
        )}
      </Tooltip>

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
