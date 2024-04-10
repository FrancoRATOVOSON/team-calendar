import { fakeActionTypeList } from "@/lib/faker";
import { ActionTypeListType } from "@/lib/types";

export function getActionTypes():Promise<{actions:ActionTypeListType}> {
  return Promise.resolve({actions: fakeActionTypeList()})
}