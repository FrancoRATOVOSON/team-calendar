import CONFIG from "@/lib/config";
import { ActionTypeListType } from "@/lib/types";
import axios from "axios";

export async function getActionTypes():Promise<{actions:ActionTypeListType}> {
  const response = axios.get<ActionTypeListType>(
    `${CONFIG.base_url}/action`,
    {
      headers: {
        Authorization: `Bearer ${CONFIG.token}`
      }
    }
  ).catch(err => {
    throw err
  })

  return {actions: (await response).data}
}