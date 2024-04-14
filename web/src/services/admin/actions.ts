import CONFIG from "@/lib/config";
import { ActionTypeListType } from "@/lib/types";
import axios from "axios";

export async function getActionTypes():Promise<{actions:ActionTypeListType}> {
  const response = await axios.get<ActionTypeListType>(
    `${CONFIG.base_url}/action`,
    {
      headers: {
        Authorization: CONFIG.Authorization
      }
    }
  ).catch(err => {
    throw err
  })

  console.log(response.data)

  return {actions: response.data}
}