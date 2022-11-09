/* eslint-disable react/no-unused-prop-types */
import { ReactElement, ReactNode } from 'react'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { Container, ImageContainer } from './styles'

interface Props {
  title?: string
  description?: string
  children?: ReactNode
  image?: ReactElement
  clearFilters?: () => void
  hasClearFilter?: boolean
  loading?: boolean
  notSvgImage?: any
  altImg?: string
  width?: string
  height?: string
}

const NoResults = ({
  title,
  description,
  children,
  image,
  clearFilters,
  hasClearFilter = false,
  loading = false,
  notSvgImage,
  altImg = '',
}: Props) => (
  <Container>
    {image && <ImageContainer>{image}</ImageContainer>}
    {notSvgImage && (
      <Box
        component="img"
        sx={{
          height: 350,
          width: 500,
          maxHeight: { xs: 500, md: 500 },
          maxWidth: { xs: 500, md: 500 },
          borderRadius: '5px',
        }}
        alt={altImg}
        src={notSvgImage}
      />
    )}

    <Box textAlign="center">
      <Typography fontWeight="500">{title}</Typography>
      <Typography color="#828282">{description}</Typography>
      {hasClearFilter && (
        <Box>
          <LoadingButton
            variant="text"
            onClick={clearFilters}
            loading={loading}
          >
            Clear Filters
          </LoadingButton>
        </Box>
      )}
    </Box>
    {children}
  </Container>
)

export default NoResults
