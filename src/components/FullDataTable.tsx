'use client'
import { useState } from "react"
import { DataTable } from "./DataTable"
import { teams } from "@/utils/constants"

export default function FullDataTable() {

  const [activeTeam, setActiveTeam] = useState('CSK')
  return (
    <>
      <div className="flex gap-5 p-6 text-center justify-center items-center bg-blue-400">
        {teams.map((team) => <div key={team} className="text-white capitalize cursor-pointer hover:text-gray-300" onClick={() => setActiveTeam(team)}>{team}</div>)}
      </div>
      <DataTable team="CSK" />
    </>
  )
}
