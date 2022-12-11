import React from 'react'
import Popup from '../../../../components/Popup'
import TableList from '../../../../components/TableList'
import { Props } from '../../../../components/TableList/types'

interface BaseProps {
  open: boolean
  onClose: () => void
  modalTitle: string
  loading: boolean
  tableProps: Props<any>
}

const AuditInfoModal = ({
  open,
  onClose,
  modalTitle,
  loading,
  tableProps,
}: BaseProps) => (
  <Popup openPopup={open} onClose={onClose} title={modalTitle}>
    <>
      <TableList
        title={tableProps.title}
        loading={loading}
        columns={tableProps.columns}
        page={tableProps.page}
        rowsPerPageOptions={tableProps.rowsPerPageOptions}
        perPage={tableProps.perPage}
        totalNumRows={tableProps.totalNumRows}
        rows={tableProps.rows}
        sortBy={tableProps.sortBy}
        orderBy={tableProps.orderBy}
        onPageChange={tableProps.onPageChange}
        onNumRowsChange={tableProps.onNumRowsChange}
        onOrderChange={tableProps.onOrderChange}
      />
    </>
  </Popup>
)

export default AuditInfoModal
