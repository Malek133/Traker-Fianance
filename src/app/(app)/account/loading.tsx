import {Card} from '@/src/components/ui/card'
import {Skeleton} from '@/components/ui/skeleton'
import DashBoardHeaderSkeleton from '@/src/components/dashoard/skeletons/dashboard-header-skeleton'

const Loading = () => {
  return (
    <div className="h-full w-full">
      <DashBoardHeaderSkeleton />
      <Card className="flex flex-col gap-4">
        <div className="space-y-8 p-4">
          {Array.from({length: 2}).map((_, index) => (
            <div className="space-y-2" key={index}>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-6 w-64" />
            </div>
          ))}
          <Skeleton className="h-10 w-32" />
        </div>
      </Card>
    </div>
  )
}

export default Loading
