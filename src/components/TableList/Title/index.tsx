import { FunctionComponent } from 'react'
import { Box } from '@mui/material'

interface Props {
  label: string
}

const Title: FunctionComponent<Props> = ({ label }: Props) => (
  <Box
    py="23px"
    justifySelf="flex-start"
    alignSelf="flex-start"
    fontWeight="500"
    fontSize="20px"
    color="#333333"
  >
    {label}
  </Box>
)

export default Title
