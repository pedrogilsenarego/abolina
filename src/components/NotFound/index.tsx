import React from 'react'
import { Typography } from '@mui/material'
import { i18n } from '../../translations/i18n'

const NotFound: React.FunctionComponent = () => (
  <Typography>{i18n.t('errors.notFound404')}</Typography>
)

export default NotFound
