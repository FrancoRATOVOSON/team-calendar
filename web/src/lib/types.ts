export type UserType = {
  name: string
  email: string
  id: number
}

export type UserInput = {
  name: string
  email: string
  password: string
}

export type UserListType = Array<UserType>

export type ActionTypeType = {
  id: number
  name: string
}

export type ActionTypeListType = Array<ActionTypeType>