import { Box, Button, TextField, useColorScheme } from '@mui/material'
import type { ChangeEvent, FC } from 'react'
import { useEffect, useState } from 'react'
import { ErrorOutline } from '@mui/icons-material'
import { useDrawerContext } from '@contexts'
import { Banner } from 'components/Banner'
import { INTERNAL_SERVER_ERROR } from '@constants'
import { DrawerSkeleton } from '../DrawerSkeleton'

export const DrawerForm: FC = () => {
  const { action, user, loading, error, actionLoading, onClose, onSubmit } = useDrawerContext()
  const { mode } = useColorScheme()
  const isDarkMode = mode === 'dark'
  const isCreate = action?.type === 'create'
  const isUpdate = action?.type === 'update'
  const isViewing = action?.type === 'open'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const isNew = name !== user?.name || email !== user.email
  const showButtons = !error && !loading && (isUpdate || isCreate)

  useEffect(() => {
    if ((isUpdate || isViewing) && user) {
      setName(user.name || '')
      setEmail(user.email || '')
    } else if (isCreate) {
      setName('')
      setEmail('')
    }
  }, [user, isCreate, isUpdate, isViewing])

  if (!action || (isUpdate && !user)) return null

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    onSubmit({ email, name }, user?.id)
    onClose()
  }

  return !loading ? (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems={error ? 'center' : 'stretch'}
      gap={3}
    >
      {error ? (
        <Banner title={INTERNAL_SERVER_ERROR} icon={<ErrorOutline fontSize="large" />} />
      ) : (
        <>
          <TextField
            id="user-name"
            size="small"
            label="Name"
            value={name}
            autoComplete="off"
            onChange={handleNameChange}
            variant="outlined"
            color={isDarkMode ? 'secondary' : 'primary'}
            disabled={action.type === 'open'}
          />

          <TextField
            id="user-email"
            size="small"
            label="Email"
            value={email}
            autoComplete="off"
            onChange={handleEmailChange}
            variant="outlined"
            color={isDarkMode ? 'secondary' : 'primary'}
            disabled={action.type === 'open'}
          />

          {isViewing && user?.id && (
            <TextField
              id="user-id"
              label="User Id"
              size="small"
              value={user.id}
              variant="outlined"
              color={isDarkMode ? 'secondary' : 'primary'}
              disabled
            />
          )}
        </>
      )}

      {showButtons && (
        <Box display="flex" gap={2} justifyContent="center" alignItems="center">
          <Button sx={{ width: '100%' }} variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            color={isDarkMode ? 'secondary' : 'primary'}
            disabled={!isNew}
            loading={actionLoading}
            onClick={handleSubmit}
          >
            {isCreate && 'Create'}
            {isUpdate && 'Update'}
          </Button>
        </Box>
      )}
    </Box>
  ) : (
    <DrawerSkeleton />
  )
}
