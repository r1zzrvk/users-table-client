import { Skeleton, TableCell, TableRow } from '@mui/material'
import type { FC } from 'react'

export const TableSkeleton: FC = () => {
  const skeletons = Array.from({ length: 6 }, (_, i) => i)
  return skeletons.map(item => (
    <TableRow key={item}>
      <TableCell>
        <Skeleton animation="wave" width={24} height={24} variant="circular" />
      </TableCell>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" width="57%" height={14} />
      </TableCell>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" width="33%" height={14} />
      </TableCell>
    </TableRow>
  ))
}
