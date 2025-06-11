
import {Skeleton} from '@/components/ui/skeleton'
import DashBoardHeaderSkeleton from '@/src/components/dashoard/skeletons/dashboard-header-skeleton'

const Loading = () => {
  return (
    <div className="h-full w-full">
      <DashBoardHeaderSkeleton />
      <div className="space-y-4 py-4">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-6 w-full md:w-2/3" />
      </div>
      <div className="flex flex-col items-center gap-8 p-4 md:flex-row md:flex-wrap">
        {Array.from({length: 3}).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <Skeleton className="size-44" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading
