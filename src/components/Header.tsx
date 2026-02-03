'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
export default function Header() {
  const router = useRouter()
  function confirmLogout() {
  }
  function logOut() {
    localStorage.clear()
    router.push('/')
  }
  return (
    <div className="w-svw flex justify-between mt-3 px-5">
      {/* <Tabs defaultValue="account" className="w-full flex items-center justify-center mt-5 "> */}
      {/*   <TabsList> */}
      {/*     <TabsTrigger value="game" onClick={() => router.push('/admin/view')}>Game View</TabsTrigger> */}
      {/*     <TabsTrigger value="team" onClick={() => router.push('/admin/team')}>Team View</TabsTrigger> */}
      {/*   </TabsList> */}
      {/*   <TabsContent value="game"></TabsContent> */}
      {/*   <TabsContent value="team"></TabsContent> */}
      {/* </Tabs> */}
      <Tabs defaultValue="account" className="w-100">
        <TabsList>
          <TabsTrigger value="teams" onClick={() => router.push('/admin/team')}>Teams</TabsTrigger>
          <TabsTrigger value="players" onClick={() => router.push('/admin/players')}>Players</TabsTrigger>
        </TabsList>
      </Tabs>
      <HoverCard>
        <HoverCardTrigger>
          <Avatar className="mr-5">
            <AvatarImage src='/user.png' />
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <Dialog>
            <DialogTrigger>
              <div >Log out</div>
            </DialogTrigger>

            <DialogContent showCloseButton={true} className="w-56">
              <DialogHeader>
                <DialogTitle className="mb-3">Comfirm?</DialogTitle>
                <DialogDescription>
                  <Button variant='destructive' onClick={logOut}>logout</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
