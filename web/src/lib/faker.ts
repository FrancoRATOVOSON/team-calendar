import {faker} from '@faker-js/faker'
import { ActionTypeListType, ActionTypeType, UserListType, UserType } from "./types";

export function fakeUser():UserType {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    name: faker.person.fullName()
  }
}

export function fakeUserList():UserListType {
  const array:UserListType = []
  const length = faker.number.int({min: 15, max: 150})

  for (let index = 0; index <= length; index++) {
    array.push(fakeUser())
  }

  return array
}


export function fakeActionType():ActionTypeType{
  return {
    id: faker.number.int(),
    name: faker.word.sample()
  }
}

export function fakeActionTypeList():ActionTypeListType {
  const array:ActionTypeListType = []
  const length = faker.number.int({min: 3, max: 5})

  for (let index = 0; index <= length; index++) {
    array.push(fakeActionType())
  }

  return array
}