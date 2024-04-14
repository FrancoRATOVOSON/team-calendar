import * as React from 'react'

export function useLoadData<T>(
  query: () => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRejected?: (err: any) => void
) {
  const [index, updateIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState<T | undefined>(undefined)

  React.useEffect(() => {
    query()
      .then(value => {
        setLoading(false)
        setData(value)
      })
      .catch(err => {
        setError(false)
        onRejected?.(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const reloadData = React.useCallback(() => {
    updateIndex(idx => idx + 1)
  }, [])

  return { loading, error, data, reloadData }
}
