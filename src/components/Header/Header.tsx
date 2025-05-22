import { useColors } from '@hooks'
import {
  AppBar,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useColorScheme,
} from '@mui/material'
import type { FC } from 'react'

export const Header: FC = () => {
  const { mode, setMode } = useColorScheme()
  const { grey, purple } = useColors()
  const isDarkMode = mode === 'dark'

  if (!mode) {
    setMode('dark')
  }

  const handleChange = (_: React.MouseEvent<HTMLElement>, value: 'dark' | 'light') => {
    if (value === null) {
      return
    }
    setMode(value)
  }

  return (
    <Box>
      <AppBar
        position="static"
        color="primary"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography
          variant="h4"
          component="div"
          color={isDarkMode ? grey[200] : grey[600]}
          bgcolor={isDarkMode ? purple[700] : grey[200]}
          padding="2px 16px"
          borderRadius={1}
        >
          Admin
        </Typography>
        <ToggleButtonGroup
          sx={mode === 'light' ? { backgroundColor: 'white' } : undefined}
          size="small"
          color="standard"
          value={mode}
          exclusive
          onChange={handleChange}
          aria-label="theme mode"
        >
          <ToggleButton color="secondary" value="dark" aria-label="dark">
            Dark
          </ToggleButton>
          <ToggleButton color="primary" value="light" aria-label="light">
            Light
          </ToggleButton>
        </ToggleButtonGroup>
      </AppBar>
    </Box>
  )
}
