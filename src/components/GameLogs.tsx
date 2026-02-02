'use client'
import { GameLog } from "@/types/api"
import { getLogs } from "@/utils/api"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formatNumber } from "@/utils/bid"

export default function GameLogs() {
  const [logs, setLogs] = useState<GameLog[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  useEffect(() => {
    const gameId = localStorage.getItem('game')
    getLogs(parseInt(gameId!)).then((res) => setLogs(res))
  }, [])

  // Calculate pagination
  const totalPages = logs ? Math.ceil(logs.length / itemsPerPage) : 0
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLogs = logs?.slice(startIndex, endIndex)

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentLogs?.map((log) => (
            <TableRow key={log.time}>
              <TableCell>{log.playerName}</TableCell>
              <TableCell>{log.team}</TableCell>
              <TableCell className={log.transactionType === 'REFUND' ? `text-red-400` : 'text-green-400'}>{log.transactionType}</TableCell>
              <TableCell>{formatNumber(log.amount)}</TableCell>
              <TableCell className="text-right">{log.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => setCurrentPage(page as number)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}
