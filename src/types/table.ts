import type { MouseEvent } from 'react'
import type { Action } from './drawer'

export type HeaderCell = {
  id: string
  label: string
}

export type TableData = {
  id: string
  name: string
  email: string
}

export type TableProps = {
  rows: TableData[]
  headerCells: HeaderCell[]
  searchTerm: string | null
  rowsPerPage: number
  totalCount: number | undefined
  page: number
  loading: boolean
  error: boolean
  selectedIds: string[]
  onOpenDrawer: (
    e: MouseEvent<HTMLTableRowElement> | MouseEvent<HTMLButtonElement>,
    action: Action,
  ) => void
  onOpenDialog: (e: MouseEvent<HTMLButtonElement>, uid: TableData['id']) => void
  onSearchChange: React.Dispatch<React.SetStateAction<string>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
}

export type TableContextValue = Omit<
  TableProps,
  'onSearchChange' | 'setRowsPerPage' | 'setPage' | 'setSelectedIds'
> & {
  defaultRows: TableData[]
  selectedIds: TableData['id'][]
  orderBy: keyof TableData
  sortOrder: SortOrder
  page: number
  resetFilters: () => void
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePage: (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>, id: TableData['id']) => void
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRequestSort: (e: React.MouseEvent<unknown>, property: keyof TableData) => void
}

export type SortOrder = 'asc' | 'desc'
