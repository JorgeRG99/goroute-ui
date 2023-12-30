import { Skeleton } from "@nextui-org/react";

export function FeedPostCardSkeleton() {
  return (
    <div className="w-[80%] h-[16em] rounded-xl flex flex-col pl-[2em] gap-[1.5em] bg-[#f4f4f4] py-[2em]">
      <div className="w-[93%] h-[40%] flex gap-3">
        <Skeleton className="h-full w-[13%] rounded-full" />
        <div className="h-full w-[10em] py-[1em] flex flex-col gap-[.8em]">
          <Skeleton className="h-[25%] w-[56%] rounded-xl" />
          <Skeleton className="h-[25%] w-[56%] rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-[1.4em] w-[80%] rounded-full" />
      <div className="flex flex-col gap-[.5em]">
        <Skeleton className="h-[.6em] w-[95%] rounded-full" />
        <Skeleton className="h-[.6em] w-[95%] rounded-full" />
        <Skeleton className="h-[.6em] w-[95%] rounded-full" />
      </div>
    </div>
  );
}
