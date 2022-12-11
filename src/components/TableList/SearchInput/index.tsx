import React from 'react'
import { Close } from '@mui/icons-material'
import Search from '@mui/icons-material/Search'
import { InputAdornment } from '@mui/material'
import { CustomSearchInput } from './styles'

export interface SearchInputProps {
  value: string | undefined
  onChange: (newSearchQuery: string) => void
  placeholder: string
  border?: string
}

const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  border = 'none',
}: SearchInputProps) => (
  <CustomSearchInput
    border={border}
    fullWidth
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    startAdornment={
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    }
    endAdornment={
      <InputAdornment
        position="end"
        sx={{ cursor: 'pointer' }}
        onClick={() => onChange('')}
      >
        <Close />
      </InputAdornment>
    }
  />
)

export default SearchInput
