import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const CreatorCardLoader = () => {
  return (
    <Card className="relative flex flex-col gap-4 shadow-md p-4 rounded-md">
      <div className="flex flex-col items-center gap-2">
        <div className="relative mb-2">
          <Skeleton className="rounded-full w-40 h-40" />
          <Skeleton className="absolute inset-0 border-4 border-gray-200 rounded-full" />
        </div>
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-full h-12" />
        <div className="gap-2 grid grid-cols-2 w-full">
          <Skeleton className="col-span-1 h-10" />
          <Skeleton className="col-span-1 h-10" />
        </div>
      </div>
    </Card>
  )
}
