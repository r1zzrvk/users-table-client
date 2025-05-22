import { Box, Skeleton } from '@mui/material'
import type { FC } from 'react'

export const DrawerSkeleton: FC = () => {
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={2}>
      <Skeleton animation="wave" width="100%" height={40} />
      <Skeleton animation="wave" width="100%" height={40} />
      <Skeleton animation="wave" width="100%" height={40} />
    </Box>
  )
}
