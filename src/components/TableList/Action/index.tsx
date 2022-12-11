import { FunctionComponent, useState } from 'react'
import {
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Icon,
  Box,
} from '@mui/material'
import { TableListAction } from '../types'
import * as Styled from './styles'
import Toggle from '../../../components/Inputs/Toggle'

interface ActionProps extends TableListAction {
  onClick: () => void
}

export const Action: FunctionComponent<ActionProps> = ({
  label,
  buttonType = 'icon',
  dimColor,
  confirmationDescription,
  confirmationRequired,
  confirmationTitle,
  disabled,
  icon,
  onClick,
  confirmationButtonLabel = 'Accept',
  declineButtonLabel = 'Decline',
}: ActionProps) => {
  const [openConfirmation, setOpenConfirmation] = useState(false)

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false)
  }

  const handleClick = () => {
    if (confirmationRequired) {
      if (openConfirmation) {
        handleCloseConfirmation()
        onClick()
      } else {
        setOpenConfirmation(true)
      }
      return
    }
    onClick()
  }

  const renderToggle = () =>
    buttonType === 'isDimmed' ? (
      <>
        <Box
          sx={{
            backgroundColor: dimColor || 'orange',
            minWidth: '10px',
            minHeight: '10px',
            borderRadius: '50%',
          }}
        />
      </>
    ) : (
      <Box>
        <Toggle
          isActive={!disabled}
          // todo create isActive prop and use disabled for disabled prop
          disabled={buttonType === 'disabledToggle'}
          onClick={handleClick}
        />
      </Box>
    )

  return (
    <>
      <Tooltip arrow placement="top" title={label}>
        {buttonType === 'icon' ? (
          <Styled.IconButton onClick={handleClick} disabled={disabled}>
            {icon && <Icon>{icon}</Icon>}
          </Styled.IconButton>
        ) : (
          renderToggle()
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
