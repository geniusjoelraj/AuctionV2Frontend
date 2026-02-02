'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
export default function Header() {
  const router = useRouter()
  return (
    <>
      <Tabs defaultValue="account" className="w-full flex items-center justify-center mt-5 ">
        <TabsList>
          <TabsTrigger value="game" onClick={() => router.push('/admin/view')}>Game View</TabsTrigger>
          <TabsTrigger value="team" onClick={() => router.push('/admin/team')}>Team View</TabsTrigger>
        </TabsList>
        <TabsContent value="game"></TabsContent>
        <TabsContent value="team"></TabsContent>
      </Tabs>
    </>
  )
}
