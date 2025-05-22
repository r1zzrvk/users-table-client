import { Box, TableCell, TableRow } from '@mui/material'
import { Banner, BannerProps } from 'components/Banner'
import type { FC } from 'react'

type TableBannerProps = BannerProps

export const TableBanner: FC<TableBannerProps> = props => {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ border: 'none' }}>
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Banner {...props} />
        </Box>
      </TableCell>
    </TableRow>
  )
}
