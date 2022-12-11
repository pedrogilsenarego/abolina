/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { Box } from '@mui/material'
import AuditInfoModal from './components/auditInfoModal'
import FilterBoxBar from './components/filterBoxBar'
import SearchSelectBoxBar from './components/searcSelectBoxBar'
import { Props } from './types'
import CanAccess from '../../components/CanAccess'
import CreateBox from '../../components/CreateBox'
import { FilterBox } from '../../components/FilterBox/styles'
import TableList from '../../components/TableList'

interface BaseProps {
  id: number
}

const TableListing = <T extends BaseProps>(props: Props<T>) => {
  const getListContainer = () => (
    <>
      {props.showCreateActionBox && (
        <CanAccess
          as={props.createActionRole}
          permissions={props.createActionPermissions}
        >
          <CreateBox
            label={props.createActionLabel || ''}
            handleCreateCampaign={props.handleCreateAction}
            maxWidth="fit-content"
          />
        </CanAccess>
      )}
      {props.showCustomCreationBox && (
        <CanAccess
          as={props.customCreateActionRole}
          permissions={props.customCreateActionPermissions}
        >
          <Box
            gap={{
              xs: 1,
              md: 2,
            }}
            sx={{
              display: 'flex',
            }}
          >
            {props.customCreationBox}
          </Box>
        </CanAccess>
      )}
      {!props.showCustomFilterBar && (
        <>
          {props.showFilterBox && (
            <>
              <FilterBox>
                <FilterBoxBar
                  filterBarTitle={props.filterBarTitle}
                  filterOptions={props.filterOptions}
                  filterBarLabel={props.filterBarLabel}
                  onChange={props.onChange}
                  filterBarNumRecords={props.filterBarNumRecords}
                  filterBarStatusQuickFilter={props.filterBarStatusQuickFilter}
                  filterBoxBarRole={props.filterBoxBarRole}
                  filterBoxBarPermissions={props.filterBoxBarPermissions}
                  showMultipleFilterBoxBar={props.showMultipleFilterBoxBar}
                  multipleFilterBoxBarLabel={props.multipleFilterBoxBarLabel}
                  multibleFilterBoxBarOptions={
                    props.multibleFilterBoxBarOptions
                  }
                  multibleFilterBoxBarTitle={props.multibleFilterBoxBarTitle}
                  multibleFilterBoxBarOnChange={
                    props.multibleFilterBoxBarOnChange
                  }
                  multibleFilterBoxBarNumRecords={
                    props.multibleFilterBoxBarNumRecords
                  }
                  muiltipleFilterBarStatusQuickFilter={
                    props.muiltipleFilterBarStatusQuickFilter
                  }
                  muiltipleFilterBoxBarRole={props.muiltipleFilterBoxBarRole}
                  muiltipleFilterBoxBarPermissions={
                    props.muiltipleFilterBoxBarPermissions
                  }
                  refKey={props.refKey}
                  refValue={props.refValue}
                  multipleRefKey={props.multipleRefKey}
                  multipleRefValue={props.multipleRefValue}
                />
                <SearchSelectBoxBar
                  showSearchInput={props.showSearchInput}
                  showSearchSelect={props.showSearchSelect}
                  searchValue={props.searchValue}
                  searchPlaceholder={props.searchPlaceholder}
                  handleSearchQuery={props.handleSearchQuery}
                  showStartEndDte={props.showStartEndDte}
                  startDateProps={props.startDateProps}
                  endDateProps={props.endDateProps}
                  showCustomSearchSelectSide={props.showCustomSearchSelectSide}
                  customSearchSelectSide={props.customSearchSelectSide}
                  searchInputPlaceHolder={props.searchInputPlaceHolder}
                  searchInputValue={props.searchInputValue}
                  searchInputOnChange={props.searchInputOnChange}
                  searchField={props.searchField}
                  items={props.items}
                  handleChange={props.handleChange}
                  showCustomSearchinputSide={props.showCustomSearchinputSide}
                  customSearchinputSide={props.customSearchinputSide}
                  customSearchinputSideRole={props.customSearchinputSideRole}
                  customSearchinputSidePermissions={
                    props.customSearchinputSidePermissions
                  }
                />
              </FilterBox>
            </>
          )}
        </>
      )}
      {props.showCustomFilterBar && (
        <>
          <FilterBox>{props.customFilterBar}</FilterBox>
        </>
      )}
      {props.multipleActions}
      {props.showAuditInfo && (
        <AuditInfoModal
          open={props.showAuditInfo}
          onClose={props.handleAuditInfoClose}
          loading={props.auditLoading}
          modalTitle={props.auditInfoTitle}
          tableProps={props.auditTableProps}
        />
      )}
      <TableList
        title={props.title}
        enableCheckBox={props.enableCheckBox}
        enableBulkSelect={props.enableBulkSelect}
        onCheckBoxChangeAll={props.onCheckBoxChangeAll}
        selectedOptions={props.selectedOptions}
        loading={props.loading}
        columns={props.columns}
        page={props.page}
        perPage={props.perPage}
        totalNumRows={props.totalNumRows}
        rows={props.rows}
        sortBy={props.sortBy}
        orderBy={props.orderBy}
        onPageChange={props.onPageChange}
        onNumRowsChange={props.onNumRowsChange}
        onOrderChange={props.onOrderChange}
        onAction={props.onAction}
        onCheckBoxChange={props.onCheckBoxChange}
        hasClearFilter={props.hasClearFilter || false}
        clearFilters={props.clearFilters}
        disablePagination={props.disablePagination || false}
      />
    </>
  )

  return (
    <Box
      gap={{ xs: 1.2, sm: 2, lg: 2.5 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {getListContainer()}
    </Box>
  )
}

export default TableListing
