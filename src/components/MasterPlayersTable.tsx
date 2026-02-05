"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from "react"
import { substituteCheck } from "@/utils/bid"
import { Transaction } from "@/types/api"
import { Button } from "./ui/button"
import { ToastContainer } from "react-toastify"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function MasterDataTable<TData extends Transaction, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
  })

  const finalizeTeam = () => {

  }


  const [message, setMessage] = useState<string>('')
  const [isValid, setIsValid] = useState(true)
  const allPlayers: Transaction[] = table.getRowModel().rows.map(row => row.original);
  const selectedRowsData: Transaction[] = table.getFilteredSelectedRowModel().rows.map(row => row.original);
  useEffect(() => {
    substituteCheck(selectedRowsData, allPlayers, setMessage, setIsValid)
  }, [selectedRowsData])
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className={`flex text-lg p-3 text-center justify-between items-center ${isValid ? 'text-green-400' : 'text-red-400'}`}>
        <span>
          {message}
        </span>
        <Button disabled={!isValid} className={!isValid ? 'text-gray-600' : ''} variant={isValid ? 'default' : 'ghost'} onClick={finalizeTeam}>
          Finalize Team
        </Button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
