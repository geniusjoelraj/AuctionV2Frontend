'use client'

import { Transaction } from "@/types/api"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "./ui/badge"
import { formatNumber } from "@/utils/bid"

export const substituteColumn: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'playerType',
    header: 'Player Type'
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const player = row.original
      return (
        <div className="flex gap-1 flex-wrap">
          {player.isUncapped && <Badge variant="default">uncapped</Badge>}
          {player.isForeign && <Badge variant="secondary">foreign</Badge>}
          {player.isLegend && (
            <Badge
              variant="destructive"
              style={{ background: "linear-gradient(135deg, #E5CD6D 0%, #B47B11 100%)" }}
            >
              legend
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'points',
    header: 'Points'
  },
  {
    accessorKey: 'boughtFor',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("boughtFor"))
      const formatted = formatNumber(amount)
      return <div className="font-medium text-right">{formatted}</div>
    },
  },
]
