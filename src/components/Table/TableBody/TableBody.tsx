import { ErrorOutline, SentimentVeryDissatisfied } from '@mui/icons-material'
import {
  Checkbox,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  useColorScheme,
} from '@mui/material'
import type { FC } from 'react'
import { TableBanner } from '../TableBanner'
import { TableSkeleton } from '../TableSkeleton'
import { INTERNAL_SERVER_ERROR } from '@constants'
import { useTableContext } from '@contexts'

export const TableBody: FC = () => {
  const { rows, handleSelect, selectedIds, resetFilters, onOpenDrawer, loading, error } =
    useTableContext()
  const { mode } = useColorScheme()
  const isDarkMode = mode === 'dark'

  return (
    <MuiTableBody>
      {!loading &&
        !error &&
        rows.map(({ email, id, name }, index) => {
          const isItemSelected = selectedIds.includes(id)
          const labelId = `table-checkbox-${index}`

          return (
            <TableRow
              hover
              onClick={e => onOpenDrawer(e, { type: 'open', uid: id })}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={id}
              selected={isItemSelected}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
                <Checkbox
                  color={isDarkMode ? 'secondary' : 'primary'}
                  checked={isItemSelected}
                  onChange={e => handleSelect(e, id)}
                  slotProps={{
                    input: {
                      'aria-labelledby': labelId,
                    },
                  }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row">
                {name}
              </TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
          )
        })}
      {rows.length === 0 && !loading && !error && (
        <TableBanner
          title="No users found"
          icon={<SentimentVeryDissatisfied fontSize="large" />}
          buttonText="Reset filters"
          onButtonClick={resetFilters}
        />
      )}
      {error && !loading && (
        <TableBanner title={INTERNAL_SERVER_ERROR} icon={<ErrorOutline fontSize="large" />} />
      )}
      {loading && <TableSkeleton />}
    </MuiTableBody>
  )
}
