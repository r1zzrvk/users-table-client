import { Box, Table as MuiTable, Paper, TableContainer, useColorScheme } from '@mui/material'
import { type FC } from 'react'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import { TableToolbar } from './TableToolbar'
import { TableFooter } from './TableFooter'
import { ELEMENTS_HEIGHT_SUM } from '@constants'
import { useColors, useScrollStyle } from '@hooks'

export const Table: FC = () => {
  const { mode } = useColorScheme()
  const { grey } = useColors()
  const scrollStyle = useScrollStyle()
  const isDarkMode = mode === 'dark'

  return (
    <Box
      sx={{
        width: '100%',
        ...scrollStyle,
      }}
    >
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          width: '100%',
          overflow: 'hidden',
          backgroundColor: isDarkMode ? grey[900] : grey[100],
        }}
      >
        <TableToolbar />
        <TableContainer
          sx={{
            height: `calc(100vh - ${ELEMENTS_HEIGHT_SUM}px)`,
            ...scrollStyle,
          }}
        >
          <MuiTable
            stickyHeader
            sx={{ minWidth: 500 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHeader />
            <TableBody />
          </MuiTable>
        </TableContainer>
        <TableFooter />
      </Paper>
    </Box>
  )
}
