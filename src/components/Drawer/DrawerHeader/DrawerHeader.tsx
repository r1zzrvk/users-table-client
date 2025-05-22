import { useDrawerContext } from '@contexts'
import { ArrowBack } from '@mui/icons-material'
import { Box, IconButton, Skeleton, Tooltip, Typography } from '@mui/material'
import type { FC } from 'react'

export const DrawerHeader: FC = () => {
  const { action, onClose, user, loading } = useDrawerContext()

  const drawerTitles: Record<string, string> = {
    create: 'Creating new user',
    update: `Editing ${user?.name || ''}`,
    open: `Viewing profile`,
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
        minWidth: 310,
        padding: 2,
      }}
    >
      <Tooltip title="Back to table">
        <IconButton onClick={onClose}>
          <ArrowBack />
        </IconButton>
      </Tooltip>
      <Typography color="inherit" variant="h5" component="div">
        {!loading && action && drawerTitles[action.type]}
        {loading && <Skeleton animation="wave" width="200px" />}
      </Typography>
    </Box>
  )
}
