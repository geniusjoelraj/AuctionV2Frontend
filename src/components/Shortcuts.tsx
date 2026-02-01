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
            <div className="flex flex-col gap-2">
              <div> <Kbd>Ctrl</Kbd> + <Kbd>F</Kbd> Search </div>
              <div> <Kbd>→</Kbd> Next  </div>
              <div> <Kbd>←</Kbd> Previous  </div>
              <div> <Kbd>↑</Kbd> Increment bid by amount  </div>
              <div> <Kbd>↓</Kbd> Decrement bid by amount  </div>
            </div>
            <div className="flex flex-col gap-2">
              <div> <Kbd>1</Kbd> Batsman  </div>
              <div> <Kbd>2</Kbd> Bowler  </div>
              <div> <Kbd>3</Kbd> All Rounder  </div>
              <div> <Kbd>4</Kbd> Wicket Keeper  </div>
              <div> <Kbd>R</Kbd> Refund</div>
              <div> <Kbd>B</Kbd> Custom Bid</div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
