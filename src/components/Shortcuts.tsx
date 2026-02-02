'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Kbd } from "./ui/kbd"
import { useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

export default function Shortcuts() {
  const hotkeyRef = useRef<HTMLButtonElement>(null)

  useHotkeys('ctrl+slash', () => { hotkeyRef.current?.click(); }, { preventDefault: true });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" ref={hotkeyRef} className="absolute top-5 right-5 border-0 text-xl">⌘</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shortcuts <Kbd>Ctrl</Kbd> + <Kbd>/</Kbd></DialogTitle>
          <DialogDescription className="flex gap-5">
            <span className="flex flex-col gap-2">
              <span> <Kbd>Ctrl</Kbd> + <Kbd>F</Kbd> Search </span>
              <span> <Kbd>→</Kbd> Next  </span>
              <span> <Kbd>←</Kbd> Previous  </span>
              <span> <Kbd>↑</Kbd> Increment bid by amount  </span>
              <span> <Kbd>↓</Kbd> Decrement bid by amount  </span>
            </span>
            <span className="flex flex-col gap-2">
              <span> <Kbd>1</Kbd> Batsman  </span>
              <span> <Kbd>2</Kbd> Bowler  </span>
              <span> <Kbd>3</Kbd> All Rounder  </span>
              <span> <Kbd>4</Kbd> Wicket Keeper  </span>
              <span> <Kbd>R</Kbd> Refund</span>
              <span> <Kbd>B</Kbd> Custom Bid</span>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
