import { Skeleton } from "@nextui-org/react";

export function UserProfileSkeleton() {
  return (
    <div className="w-[46%] h-[15em] flex flex-col gap-[1em] py-[.8em] fixed">
      <div className="w-full h-[31%] flex">
        <Skeleton className="rounded-full w-[9%] h-full">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <div className="w-[80%] h-full px-[1em] flex flex-col justify-center gap-3">
          <Skeleton className="rounded-full w-[25%] h-[20%]">
            <div className="h-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="rounded-full w-[12%] h-[14%]">
            <div className="h-full rounded-lg bg-secondary"></div>
          </Skeleton>
        </div>
      </div>
      <div className="flex justify-start h-[6%] w-full gap-[3em]">
        <Skeleton className="rounded-full w-[10%] h-full">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="rounded-full w-[13%] h-full">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="rounded-full w-[7%] h-full">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="rounded-full w-[17%] h-full">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
      </div>
      <div className="flex flex-col gap-[.8em] justify-center w-full h-[35%]">
        <Skeleton className="rounded-full w-[20%] h-[10%]">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="rounded-full w-[30%] h-[10%]">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="rounded-full w-[10%] h-[10%]">
          <div className="h-full rounded-lg bg-secondary"></div>
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg w-[14%] h-[16%]">
        <div className="h-full rounded-lg bg-secondary"></div>
      </Skeleton>
    </div>
  );
}
