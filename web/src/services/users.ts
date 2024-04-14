import { UserEditInput, UserInput, UserListType } from "@/lib/types";
import { api } from "@/lib/utils";

export async function getUsers(): Promise<UserListType> {
  const response = await api.get<{ users: UserListType }>(`/user`).catch((err) => {
    throw err;
  });

  return Promise.resolve(response.data.users)
}

export function createUser(data: UserInput) {
  return api.post("/user", data);
}

export function deleteUsers(ids: number[]) {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("id", `${id}`));
  return api.delete("/users", { params });
}

export function editUser(id: number, inputs: UserEditInput) {
  return api.patch(`/user/${id}`, inputs);
}

export function deleteUser(id:number) {
  return api.delete(`/user/${id}`)
}