import React from 'react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import SearchInput from '../SearchInput'
import { StyledContainer, SearchContainer, SelectContainer } from './styles'

interface Props {
  searchField: string
  items: Field[]
  handleChange: (event: any) => void
  searchValue: string | undefined
  searchPlaceholder: string
  handleSearchQuery: (event: any) => void
}

interface Field {
  code: string
  value: string
}

const SearchSelect = ({
  searchValue,
  searchPlaceholder,
  handleSearchQuery,
  searchField,
  items,
  handleChange,
}: Props) => (
  <StyledContainer>
    <SearchContainer>
      <SearchInput
        border="1px solid #C7C7CD"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={handleSearchQuery}
      />
    </SearchContainer>
    <SelectContainer>
      <FormControl fullWidth>
        <Select value={searchField} onChange={handleChange}>
          {items.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectContainer>
  </StyledContainer>
)

export default SearchSelect
