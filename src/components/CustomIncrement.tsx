'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useRef, ButtonHTMLAttributes } from "react"
import { Dispatch, SetStateAction } from "react";
import { useHotkeys } from "react-hotkeys-hook"

export default function CustomIncrement({ bid, setCurrentBid }: { bid: number, setCurrentBid: Dispatch<SetStateAction<number>> }) {
  const [curbid, setCurBid] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const customBidRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setCurBid(bid?.toString()), [bid])

  useHotkeys('b', () => customBidRef.current?.click(), { preventDefault: true })
  const handleConfirm = () => {
    const parsed = parseInt(curbid)
    if (!isNaN(parsed)) {
      setCurrentBid(parsed)
    }
    closeRef.current?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" ref={customBidRef} className="hidden">Custom</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-[#674D63]">
        <DialogHeader>
          <DialogTitle>Bid</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Input
              id="name-1"
              name="name"
              type="text"
              value={curbid}
              onChange={(e) => setCurBid(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" ref={closeRef}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
