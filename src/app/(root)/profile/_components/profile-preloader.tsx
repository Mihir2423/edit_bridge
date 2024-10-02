import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const  ProfilePreloader = () => {
  return (
    <div className="mx-auto p-4 container">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">
            <Skeleton className="w-48 h-8" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="rounded-full w-32 h-32" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-full h-10" />
              <div className="flex space-x-2">
                <Skeleton className="w-1/2 h-10" />
                <Skeleton className="w-1/2 h-10" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="mb-2 w-16 h-4" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="mt-1 w-32 h-4" />
          </div>

          <div className="space-y-4">
            <Skeleton className="w-40 h-6" />
            {[0, 1].map((index) => (
              <div key={index} className="flex flex-col items-start gap-3 border-gray-400 p-4 border rounded-md w-full">
                <Skeleton className="w-48 h-8" />
                <div className="flex items-start gap-3 w-full">
                  <Skeleton className="rounded-md w-[148px] h-[155px]" />
                  <div className="flex flex-col flex-1 gap-2">
                    <Skeleton className="w-full h-24" />
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-40 h-10" />
          </div>
          <Skeleton className="w-28 h-10" />
        </CardFooter>
      </Card>
    </div>
  )
}
