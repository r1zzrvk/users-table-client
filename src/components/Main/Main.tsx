import { FAILED_TO_DELETE, USER_DELETED, USERS_DELETED, headerCells } from '@constants'
import { useSnackbar } from '@contexts'
import { DELETE_USER, DELETE_USERS, GET_USERS } from '@graphql'
import { Box, Paper } from '@mui/material'
import { Action, DeleteUserResponse, TableData, Users } from '@types'
import { convertDataToRows } from '@utils'
import { Dialog } from 'components/Dialog'
import { Drawer } from 'components/Drawer'
import { Table, TableProvider } from 'components/Table'
import { useMemo, useState, type FC, type MouseEvent } from 'react'
import { useMutation, useQuery } from 'react-apollo'

export const Main: FC = () => {
  const { showSnackbar } = useSnackbar()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [action, setAction] = useState<Action | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(25)
  const [page, setPage] = useState<number>(0)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [deleteUsers] = useMutation(DELETE_USERS)
  const [deleteUser, deleteResponse] = useMutation<DeleteUserResponse, { id: string }>(DELETE_USER)

  const { data, loading, error, refetch } = useQuery<Users>(GET_USERS, {
    variables: {
      skip: 0,
      limit: page !== 0 ? (page + 1) * rowsPerPage : rowsPerPage,
      filter: { search: searchTerm },
    },
  })

  const rows = useMemo(() => (data ? convertDataToRows(data) : []), [data])

  const handleOpenDialog = (_: MouseEvent<HTMLButtonElement>, uid: TableData['id']) => {
    setOpenDialog(true)
    setAction({ type: 'delete', uid })
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setAction(null)
  }

  const handleOpenDrawer = (
    _: MouseEvent<HTMLTableRowElement> | MouseEvent<HTMLButtonElement>,
    action: Action,
  ) => {
    setAction(action)
    setOpenDrawer(true)
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    setAction(null)
  }

  const handleSubmitDialog = () => {
    if (action?.uid && selectedIds.length === 1) {
      deleteUser({
        variables: { id: action?.uid },
      })
        .then(() => {
          refetch()
          setSelectedIds([])
        })
        .then(() => {
          showSnackbar(USER_DELETED, 'success')
        })
        .catch(err => {
          showSnackbar(err.message || FAILED_TO_DELETE, 'error')
        })
    }

    if (selectedIds.length > 1) {
      deleteUsers({ variables: { ids: selectedIds } })
        .then(() => {
          refetch()
          setSelectedIds([])
        })
        .then(() => {
          showSnackbar(USERS_DELETED, 'success')
        })
        .catch(err => {
          showSnackbar(err.message || FAILED_TO_DELETE, 'error')
        })
    }
    handleCloseDialog()
  }

  return (
    <Box p={2}>
      <Paper elevation={0}>
        <TableProvider
          value={{
            searchTerm,
            page,
            selectedIds,
            headerCells,
            rowsPerPage,
            loading,
            error: Boolean(error),
            totalCount: data?.users.totalCount,
            rows,
            onOpenDrawer: handleOpenDrawer,
            onOpenDialog: handleOpenDialog,
            onSearchChange: setSearchTerm,
            setRowsPerPage,
            setPage,
            setSelectedIds,
          }}
        >
          <Table />
        </TableProvider>
      </Paper>
      <Drawer open={openDrawer} onClose={handleCloseDrawer} action={action} />
      <Dialog
        open={openDialog}
        title="Are you sure?"
        buttonText="Got it, delete it"
        buttonVariant="contained"
        buttonColor="error"
        loading={deleteResponse.loading}
        description="This action cannot be undone. Deleted users cannot be restored."
        onClose={handleCloseDialog}
        onClick={handleSubmitDialog}
      />
    </Box>
  )
}
