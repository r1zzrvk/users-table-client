import { TableData, Users } from '@types'

export const convertDataToRows = ({ users }: Users): TableData[] => {
  return users.users.map(({ email, id, name }) => ({
    email,
    id,
    name,
  }))
}
