import { useTableContext } from '@contexts'
import { Cancel, Delete, Edit, OpenInNew, Search } from '@mui/icons-material'
import {
  alpha,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Toolbar,
  Tooltip,
  Typography,
  useColorScheme,
} from '@mui/material'
import { type FC } from 'react'

export const TableToolbar: FC = () => {
  const { mode } = useColorScheme()
  const { selectedIds, searchTerm, handleSearch, onOpenDrawer, onOpenDialog, handleSelectAll } =
    useTableContext()
  const isDarkMode = mode === 'dark'
  const numSelected = selectedIds.length

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 2 },
        },
        numSelected > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: '1 1 100%',
          }}
        >
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
          <Tooltip title="Cancel selecting">
            <IconButton
              onClick={() =>
                handleSelectAll({
                  target: { checked: false },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <Cancel />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: '1 1 100%',
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Users
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color={isDarkMode ? 'secondary' : 'primary'}
            onClick={e => onOpenDrawer(e, { type: 'create' })}
          >
            Add new user
          </Button>
        </Box>
      )}
      {numSelected === 0 && (
        <Input
          id="search-users"
          placeholder="Search for users"
          autoComplete="off"
          color={isDarkMode ? 'secondary' : 'primary'}
          onChange={handleSearch}
          value={searchTerm}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      )}
      {numSelected > 1 && (
        <Tooltip title="Delete">
          <IconButton onClick={e => onOpenDialog(e, selectedIds[0])}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
      {numSelected === 1 && (
        <Box display="flex" gap={1}>
          <Tooltip title="Open">
            <IconButton onClick={e => onOpenDrawer(e, { type: 'open', uid: selectedIds[0] })}>
              <OpenInNew />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={e => onOpenDrawer(e, { type: 'update', uid: selectedIds[0] })}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={e => onOpenDialog(e, selectedIds[0])}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  )
}
