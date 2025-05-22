import { useTableContext } from '@contexts'
import { TablePagination } from '@mui/material'
import type { FC } from 'react'

export const TableFooter: FC = () => {
  const { totalCount, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    useTableContext()

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      count={totalCount || 0}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
