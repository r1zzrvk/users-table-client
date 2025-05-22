import { Box, Button, Paper, Typography, useColorScheme } from '@mui/material'
import type { FC, ReactNode } from 'react'

export type BannerProps = {
  title: string
  icon: ReactNode
  buttonText?: string
  onButtonClick?: () => void
}

export const Banner: FC<BannerProps> = ({ icon, title, buttonText, onButtonClick }) => {
  const { mode } = useColorScheme()
  const isDarkMode = mode === 'dark'

  return (
    <Box sx={{ width: '200px' }}>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        {icon}

        <Typography
          sx={{ flex: '1 1 100%', marginTop: 1, textAlign: 'center' }}
          color="inherit"
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
        {buttonText && (
          <Button
            size="small"
            variant="contained"
            color={isDarkMode ? 'secondary' : 'primary'}
            sx={{ marginTop: 2 }}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </Paper>
    </Box>
  )
}
