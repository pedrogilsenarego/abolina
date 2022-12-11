import React, { useMemo } from 'react'
import { Box, Grid } from '@mui/material'
import {
  Span,
  FilterLabel,
  SelectedOptionItem,
  UnselectedOptionItem,
} from './styles'
import { FilterProps } from './types'

export const FilterBar: React.FunctionComponent<FilterProps> = ({
  title,
  label,
  options,
  selectedOption,
  totalCount,
  onChange,
}: FilterProps) => {
  const list = useMemo(
    () =>
      options.map((item) => {
        if (selectedOption === item.id) {
          return (
            <SelectedOptionItem
              item
              onClick={() => onChange(item.id === selectedOption ? 0 : item.id)}
            >
              {item.name} {totalCount >= 0 ? `(${totalCount})` : null}
            </SelectedOptionItem>
          )
        }

        return (
          <UnselectedOptionItem item onClick={() => onChange(item.id)}>
            {item.name}
          </UnselectedOptionItem>
        )
      }),
    [selectedOption, totalCount, options]
  )

  return (
    <Box pt="10px">
      <FilterLabel>{title}</FilterLabel>
      <Grid container display="flex" alignItems="center" pt="10px" pb="10px">
        <Grid item>
          <Span>{label}</Span>
        </Grid>
        {list}
      </Grid>
    </Box>
  )
}
