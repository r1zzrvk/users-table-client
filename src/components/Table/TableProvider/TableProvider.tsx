import { TableContext } from '@contexts'
import { SortOrder, TableData, TableProps } from '@types'
import { getComparator } from '@utils'
import { useState, useCallback, useMemo, type ReactNode, type MouseEvent } from 'react'

type ProviderProps = {
  children: ReactNode
  value: TableProps
}

export const TableProvider = ({ children, value }: ProviderProps) => {
  const {
    rows,
    page,
    headerCells,
    totalCount,
    searchTerm,
    rowsPerPage,
    loading,
    error,
    selectedIds,
    setSelectedIds,
    setPage,
    setRowsPerPage,
    onOpenDrawer,
    onOpenDialog,
    onSearchChange,
  } = value
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [orderBy, setOrderBy] = useState<keyof TableData>('name')

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      onSearchChange(value)
    },
    [onSearchChange],
  )

  const resetFilters = useCallback(() => {
    setSortOrder('asc')
    setOrderBy('name')
    setPage(0)
    setRowsPerPage(25)
    onSearchChange('')
  }, [onSearchChange, setPage, setRowsPerPage])

  const handleChangePage = useCallback(
    (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage)
    },
    [setPage],
  )

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    [setPage, setRowsPerPage],
  )

  const handleSelect = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, id: string) => {
      setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
    },
    [setSelectedIds],
  )

  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelectedIds(rows.map(r => r.id))
      } else {
        setSelectedIds([])
      }
    },
    [rows, setSelectedIds],
  )

  const handleRequestSort = useCallback(
    (_: React.MouseEvent<unknown>, property: keyof TableData) => {
      const isAsc = orderBy === property && sortOrder === 'asc'
      setSortOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    },
    [orderBy, sortOrder],
  )

  const visibleRows = useMemo(() => {
    const sorted = [...rows].sort(getComparator(sortOrder, orderBy))

    // return sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return sorted
  }, [orderBy, rows, sortOrder])

  const contextValue = useMemo(
    () => ({
      defaultRows: rows,
      rows: visibleRows,
      headerCells,
      selectedIds,
      totalCount,
      orderBy,
      sortOrder,
      rowsPerPage,
      page,
      searchTerm,
      loading,
      error,
      onOpenDrawer,
      onOpenDialog,
      resetFilters,
      handleChangePage,
      handleSearch,
      handleSelect,
      handleSelectAll,
      handleRequestSort,
      handleChangeRowsPerPage,
    }),
    [
      rows,
      visibleRows,
      headerCells,
      selectedIds,
      totalCount,
      orderBy,
      sortOrder,
      rowsPerPage,
      page,
      error,
      searchTerm,
      loading,
      onOpenDrawer,
      onOpenDialog,
      resetFilters,
      handleChangePage,
      handleSearch,
      handleSelect,
      handleSelectAll,
      handleRequestSort,
      handleChangeRowsPerPage,
    ],
  )

  return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>
}
