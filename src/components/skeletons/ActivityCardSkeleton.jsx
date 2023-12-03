import { Skeleton } from "@nextui-org/react";

export function ActivityCardSkeleton() {
  return (
    <div className="rounded-lg w-full h-[270px] flex flex-col justify-between py-[.8em] px-[.6em]">
      <Skeleton className="rounded-2xl w-[20%] h-[8%]">
        <div className="h-full rounded-lg bg-secondary"></div>
      </Skeleton>
      <Skeleton className="rounded-md w-[100%] h-[60%]">
        <div className="h-full rounded-lg bg-secondary"></div>
      </Skeleton>
      <div className="w-full h-[20%] flex flex-col justify-between">
        <Skeleton className="rounded-lg h-[20%] w-[80%]">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <div className="flex w-full h-[50%] items-center justify-between">
          <div className="flex flex-col justify-between h-full w-full">
            <Skeleton className="rounded-lg h-[30%] w-[80%]">
              <div className="h-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="rounded-lg h-[30%] w-[60%]">
              <div className="h-full rounded-lg bg-secondary"></div>
            </Skeleton>
          </div>
          <Skeleton className="rounded-2xl w-[25%] h-[70%]">
            <div className="h-full w-full bg-secondary"></div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
