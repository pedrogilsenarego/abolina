import React, { FunctionComponent } from 'react'
import { BoxProps } from '@mui/material'
import * as Styled from './styles'

interface Props extends BoxProps {
  src: string
}

const ImagePreview: FunctionComponent<Props> = ({ src, ...rest }: Props) => (
  <Styled.Container {...rest}>
    <img height="100%" width="100%" src={src} alt="" />
  </Styled.Container>
)

export default ImagePreview
