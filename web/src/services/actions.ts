import { ActionTypeListType } from "@/lib/types";
import { api } from "@/lib/utils";

export async function getActionTypes():Promise<ActionTypeListType> {
  const response = await api.get<{actions:ActionTypeListType}>('/action').catch((err) => {
    throw err;
  });

  return response.data.actions
}

export async function createActionType(actionTypeName:string) {
  return api.post('/type-action',{name: actionTypeName})
}

export async function editActionType(id:number,name:string) {
  return api.patch('/action/'+id,{name})
}

export async function deleteActionType(id:number) {
  return api.delete('/action/'+id)
}