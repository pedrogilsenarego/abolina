import { Grid } from '@mui/material'
import CanAccess from '../../../../components/CanAccess'
import { FilterBar } from '../../../../components/FilterBar'
import { filterProps } from '../../../../presentational/ListingPage/types'

type Props = filterProps

const FilterBoxBar = ({
  filterBoxBarRole,
  filterBoxBarPermissions,
  filterBarTitle,
  filterBarLabel,
  filterOptions,
  onChange,
  filterBarNumRecords,
  filterBarStatusQuickFilter,
  showMultipleFilterBoxBar,
  muiltipleFilterBoxBarRole,
  muiltipleFilterBoxBarPermissions,
  multibleFilterBoxBarTitle,
  multipleFilterBoxBarLabel,
  multibleFilterBoxBarOptions,
  multibleFilterBoxBarOnChange,
  multibleFilterBoxBarNumRecords,
  muiltipleFilterBarStatusQuickFilter,
  refKey,
  refValue,
  multipleRefKey,
  multipleRefValue,
}: Props) => (
  <>
    <CanAccess as={filterBoxBarRole} permissions={filterBoxBarPermissions}>
      <Grid item xs={12}>
        <FilterBar
          title={filterBarTitle || ''}
          label={filterBarLabel || ''}
          options={filterOptions}
          onChange={onChange || (() => undefined)}
          totalCount={filterBarNumRecords || 0}
          selectedOption={filterBarStatusQuickFilter || 0}
          refKey={refKey}
          refValue={refValue}
        />
      </Grid>
    </CanAccess>
    {showMultipleFilterBoxBar && (
      <CanAccess
        as={muiltipleFilterBoxBarRole}
        permissions={muiltipleFilterBoxBarPermissions}
      >
        <Grid item xs={12}>
          <FilterBar
            title={multibleFilterBoxBarTitle || ''}
            label={multipleFilterBoxBarLabel || ''}
            options={multibleFilterBoxBarOptions}
            onChange={multibleFilterBoxBarOnChange || (() => undefined)}
            totalCount={multibleFilterBoxBarNumRecords || 0}
            selectedOption={muiltipleFilterBarStatusQuickFilter || ''}
            refKey={multipleRefKey}
            refValue={multipleRefValue}
          />
        </Grid>
      </CanAccess>
    )}
  </>
)

export default FilterBoxBar
