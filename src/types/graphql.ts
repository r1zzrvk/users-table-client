export type User = {
  id: string
  name: string
  email: string
}

export type GetUsersResponse = {
  users: User[]
  totalCount: number
}

export type Users = {
  users: GetUsersResponse
}

export type GetUserResponse = {
  user: User
}

export type CreateUserInput = {
  name: string
  email: string
}

export type CreateUserResponse = {
  createUser: {
    id: string
    name: string
    email: string
  }
}

export type UpdateUserInput = {
  name?: string
  email?: string
}

export type UpdateUserResponse = {
  updateUser: {
    id: string
    name: string
    email: string
  }
}

export type DeleteUserResponse = {
  deleteUser: {
    id: string
    name: string
    email: string
  }
}
