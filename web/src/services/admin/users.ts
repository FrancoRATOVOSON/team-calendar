import { UserListType } from "@/lib/types";
import { api } from "@/lib/utils";

export async function getUsers():Promise<{users:UserListType}> {
  const response = await api.get<UserListType>(`/user`).catch(err => {
    throw err
  })

  return {users: response.data}
}