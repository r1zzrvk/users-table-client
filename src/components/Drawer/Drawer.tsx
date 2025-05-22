import { Box, Drawer as MuiDrawer } from '@mui/material'
import type { FC } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import { DrawerHeader } from './DrawerHeader'
import { DrawerProvider } from './DrawerProvider'
import { DrawerForm } from './DrawerForm'
import {
  CreateUserInput,
  CreateUserResponse,
  DrawerProps,
  GetUserResponse,
  UpdateUserInput,
  UpdateUserResponse,
  User,
} from '@types'
import { useSnackbar } from '@contexts'
import { CREATE_USER, GET_USER, UPDATE_USER } from '@graphql'
import { FAILED_TO_CREATE, FAILED_TO_UPDATE, USER_CREATED, USER_UPDATED } from '@constants'

export const Drawer: FC<DrawerProps> = ({ open, onClose, action }) => {
  const { showSnackbar } = useSnackbar()
  const { data, loading, error } = useQuery<GetUserResponse>(GET_USER, {
    variables: { id: action?.uid },
    skip: !action?.uid,
  })

  const [createUser, createResponse] = useMutation<CreateUserResponse, { input: CreateUserInput }>(
    CREATE_USER,
  )
  const [updateUser, updateResponse] = useMutation<
    UpdateUserResponse,
    { id: string; input: UpdateUserInput }
  >(UPDATE_USER)

  const handleSubmit = (input: CreateUserInput, id?: User['id']) => {
    if (action?.type === 'create') {
      createUser({ variables: { input } })
        .then(() => {
          console.log('success')
          showSnackbar(USER_CREATED, 'success')
        })
        .catch(err => {
          showSnackbar(err.message || FAILED_TO_CREATE, 'error')
        })
    }

    if (action?.type === 'update' && id) {
      updateUser({
        variables: {
          id,
          input,
        },
      })
        .then(() => {
          showSnackbar(USER_UPDATED, 'success')
        })
        .catch(err => {
          showSnackbar(err.message || FAILED_TO_UPDATE, 'error')
        })
    }
  }

  if (!action) {
    return null
  }

  return (
    <MuiDrawer open={open} onClose={onClose} anchor="right">
      <DrawerProvider
        value={{
          open,
          action,
          user: data?.user,
          loading,
          actionLoading: createResponse.loading || updateResponse.loading,
          error: Boolean(error),
          onClose,
          onSubmit: handleSubmit,
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            padding: 2,
          }}
        >
          <DrawerForm />
        </Box>
      </DrawerProvider>
    </MuiDrawer>
  )
}
