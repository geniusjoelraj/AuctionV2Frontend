import { DataTableWrapper } from "@/components/DataTableWrapper"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <div className="p-10 ">
      <DataTableWrapper team={slug} />
    </div>
  )
}

