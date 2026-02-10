'use client'
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
export default function Header() {
  const router = useRouter()
  function logOut() {
    localStorage.clear()
    router.push('/')
  }
  const [team, setTeam] = useState<string | null>(null)
  useEffect(() => {
    const teamName = localStorage.getItem('teamName')
    setTeam(teamName)
  }, [])
  return (
    <>
      <div className="flex justify-between">
        <p className="text-2xl font-mono font-semibold text-violet-500">Grant Theft Auction</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <LogOut />
              </AlertDialogMedia>
              <AlertDialogTitle>Log out?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you wanna log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={logOut}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className="text-lg font-semibold">Hello, {team}</p>
    </>
  )
}
