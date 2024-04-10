import { fakeUserList } from "@/lib/faker";
import { UserListType } from "@/lib/types";

export function getUsers():Promise<{users:UserListType}> {
  return Promise.resolve({users: fakeUserList()})
}