import { ActionTypeListType } from "@/lib/types";
import { api } from "@/lib/utils";

export async function getActionTypes():Promise<{actions:ActionTypeListType}> {
  const response = await api.get<ActionTypeListType>('/action').catch(err => {
    throw err
  })

  return {actions: response.data}
}

export async function createActionType(actionTypeName:string) {
  return api.post('/type-action',{name: actionTypeName})
}