import * as React from "react"
import { UserListType } from "@/lib/types";

export default function useList(list:UserListType) {
  const [pageSize,setPageSize] = React.useState(5)
  const [offset,setOffset] = React.useState<[number,number]>([0,pageSize])
  const [selectedUsers,setSelectedUsers] = React.useState<Set<number>>(new Set([]))

  const pageCount = React.useMemo(() => {
    if(pageSize >= list.length) return 1
    return Math.ceil(list.length / pageSize)
  },[list.length, pageSize])

  const currentPage = React.useMemo(() => {
    if (offset[1] <= pageSize) return 1
    if(offset[0] === 0) return 1
    return (offset[0] / pageSize) + 1
  },[offset, pageSize])

  const handleUserSelect = React.useCallback((selected:boolean,id:number) => {
    const selectedList = new Set(selectedUsers)
    if(selected)
      selectedList.add(id)
    else selectedList.delete(id)
    setSelectedUsers(selectedList)
  },[selectedUsers])

  const changePageSize = React.useCallback(
    (size:number) => {
      if(size > 0){
        setPageSize(size)
        setOffset([0,size])
      }
    }
    ,[]
  )

  const nextPage = React.useCallback(
    () => {
      if(pageSize < list.length && (offset[0] + pageSize < list.length))
      setOffset(state => [state[0] + pageSize, state[1] + pageSize])
    },
    [list.length, offset, pageSize]
  )

  const prevPage = React.useCallback(
    () => {
      if(pageSize < list.length) {
        if(offset[0] - pageSize >= 0) setOffset(state => [state[0] - pageSize, state[1] - pageSize])
        else setOffset([0, pageSize])
      }
    },
    [list.length, offset, pageSize]
  )

  const toggleSelectAll = React.useCallback(
    () => {
      if(selectedUsers.size > 0) setSelectedUsers(new Set([]))
      else {
        const allUsers:Set<number> = new Set([])
        list.forEach(user => allUsers.add(user.id))
        setSelectedUsers(allUsers)
      }
    },
    [list, selectedUsers.size]
  )

  return {
    users: list.slice(offset[0],offset[1]),
    handleUserSelect,
    changePageSize,
    nextPage,
    prevPage,
    pageSize,
    selectedUsers,
    pageCount,
    currentPage,
    toggleSelectAll
  }
}