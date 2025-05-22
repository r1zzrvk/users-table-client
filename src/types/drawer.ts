import { CreateUserInput, User } from './graphql'
import { TableData } from './table'

export type ActionType = 'create' | 'update' | 'open' | 'delete'

export type Action = {
  type: ActionType
  uid?: TableData['id']
}

export type DrawerProps = {
  open: boolean
  action: Action | null
  onClose: () => void
}

export type DrawerContextValue = DrawerProps & {
  user: User | undefined
  loading: boolean
  error: boolean
  actionLoading: boolean
  onSubmit: (input: CreateUserInput, id?: User['id']) => void
}
