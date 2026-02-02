import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function Header() {
  return (
    <>
      <Tabs defaultValue="account" className="w-full flex items-center justify-center mt-5 ">
        <TabsList>
          <TabsTrigger value="game">Game View</TabsTrigger>
          <TabsTrigger value="team">Team View</TabsTrigger>
        </TabsList>
        <TabsContent value="game"></TabsContent>
        <TabsContent value="team"></TabsContent>
      </Tabs>
    </>
  )
}
