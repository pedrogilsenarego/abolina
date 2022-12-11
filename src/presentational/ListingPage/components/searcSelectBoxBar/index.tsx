import { Grid } from '@mui/material'
import { DateRangeContainer, SearchBoxContainer } from './styles'
import CanAccess from '../../../../components/CanAccess'
import SearchInput from '../../../../components/Inputs/SearchInput'
import SearchSelect from '../../../../components/Inputs/SearchSelect'
import StartEndDateFilter from '../../../../components/Inputs/StartEndDateFilter'
import { searchProps } from '../../../../presentational/ListingPage/types'

type Props = searchProps

const SearchSelectBoxBar = ({
  showSearchInput,
  showSearchSelect,
  searchValue,
  searchPlaceholder,
  handleSearchQuery,
  showStartEndDte,
  startDateProps,
  endDateProps,
  showCustomSearchSelectSide,
  customSearchSelectSide,
  searchInputPlaceHolder,
  searchInputValue,
  searchInputOnChange,
  searchField,
  items,
  handleChange,
  showCustomSearchinputSide,
  customSearchinputSide,
  customSearchinputSideRole,
  customSearchinputSidePermissions,
}: Props) => (
  <Grid
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{
      xs: {
        flexDirection: 'column',
      },
    }}
  >
    <Grid item xs={12}>
      <SearchBoxContainer
        py={{ xs: 0, sm: 1 }}
        px={{ xs: 0, sm: 0 }}
        columnGap={1}
        justifyContent="space-between"
      >
        {!showSearchInput && (
          <>
            {showSearchSelect && (
              <SearchSelect
                searchValue={searchValue}
                searchPlaceholder={searchPlaceholder || ''}
                handleSearchQuery={handleSearchQuery || (() => undefined)}
                searchField={searchField || ''}
                items={items || []}
                handleChange={handleChange || (() => undefined)}
              />
            )}
            {!showCustomSearchSelectSide && (
              <>
                {showStartEndDte && (
                  <DateRangeContainer>
                    <StartEndDateFilter
                      startDateProps={
                        startDateProps || {
                          value: null,
                          handleChange: () => undefined,
                          inputLabel: '',
                        }
                      }
                      endDateProps={
                        endDateProps || {
                          value: null,
                          handleChange: () => undefined,
                          inputLabel: '',
                        }
                      }
                    />
                  </DateRangeContainer>
                )}
              </>
            )}
          </>
        )}
        {showCustomSearchSelectSide && <>{customSearchSelectSide}</>}
        {showSearchInput && (
          <Grid item container justifyContent="space-between">
            <Grid item xs={4}>
              <SearchInput
                border="1px solid #C7C7CD"
                placeholder={searchInputPlaceHolder || ''}
                value={searchInputValue || ''}
                onChange={searchInputOnChange || (() => undefined)}
              />
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              {showCustomSearchinputSide && (
                <CanAccess
                  as={customSearchinputSideRole}
                  permissions={customSearchinputSidePermissions}
                >
                  <>{customSearchinputSide}</>
                </CanAccess>
              )}
            </Grid>
          </Grid>
        )}
      </SearchBoxContainer>
    </Grid>
  </Grid>
)

export default SearchSelectBoxBar
