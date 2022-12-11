import React from 'react'
import { Box } from '@mui/material'
import Button from '../Buttons/Button'

interface Props {
  label: string
  handleCreateCampaign?: () => void
  maxWidth?: string
  buttonAlign?: string
}

const CreateBox = ({
  label,
  handleCreateCampaign,
  maxWidth = '165px',
  buttonAlign = 'end',
}: Props) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: buttonAlign ?? 'end',
    }}
  >
    <Box
      maxWidth={maxWidth}
      ml={buttonAlign ? '0' : 2}
      width="100%"
      bgcolor="#F68B1E"
      borderRadius="5px"
      my="5px"
    >
      <Button label={label} onClick={handleCreateCampaign} />

    </Box>
  </Box>
)

export default CreateBox
