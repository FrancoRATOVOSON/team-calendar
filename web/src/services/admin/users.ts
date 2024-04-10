import CONFIG from "@/lib/config";
import { UserListType } from "@/lib/types";
import axios from 'axios'

export async function getUsers():Promise<{users:UserListType}> {
  const response = await axios.get<UserListType>(
    `${CONFIG.base_url}/user`,
    {
      headers: {
        Authorization: CONFIG.Authorization
      }
    }
  ).catch(err => {
    throw err
  })

  return {users: response.data}
}