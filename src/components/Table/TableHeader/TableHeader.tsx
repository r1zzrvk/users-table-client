import { useTableContext } from '@contexts'
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  useColorScheme,
} from '@mui/material'
import { TableData } from '@types'
import type { FC } from 'react'

export const TableHeader: FC = () => {
  const { mode } = useColorScheme()
  const isDarkMode = mode === 'dark'
  const {
    selectedIds,
    defaultRows,
    handleSelectAll,
    headerCells,
    orderBy,
    sortOrder,
    handleRequestSort,
  } = useTableContext()
  const numSelected = selectedIds.length
  const rowCount = defaultRows.length

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Tooltip title={numSelected === rowCount ? 'Deselect all' : 'Select all'}>
            <Checkbox
              color={isDarkMode ? 'secondary' : 'primary'}
              indeterminate={numSelected !== 0 && numSelected !== rowCount}
              checked={numSelected === rowCount}
              onChange={handleSelectAll}
              slotProps={{
                input: {
                  'aria-label': 'select all users',
                },
              }}
            />
          </Tooltip>
        </TableCell>
        {headerCells.map(({ id, label }) => (
          <TableCell key={id} sortDirection={orderBy === id ? sortOrder : false}>
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? sortOrder : 'asc'}
              onClick={e => handleRequestSort(e, id as keyof TableData)}
            >
              {label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
