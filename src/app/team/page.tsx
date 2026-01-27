import CurrentBid from "@/components/CurrentBid";
import { DataTableWrapper } from "@/components/DataTableWrapper";

export default function TeamView() {
  return (
    <div className="p-10 ">
      <CurrentBid />
      <DataTableWrapper team="CSK" />
    </div>
  )
}
