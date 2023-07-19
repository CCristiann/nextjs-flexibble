import React from "react";

import Skeleton from "react-loading-skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[230px] sm:h-[250px] lg:h-[280px] xl:h-[314px]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <Skeleton circle width={32} height={32} />
          </div>
          <Skeleton className="font-semibold text-sm md:text-base" />
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <Skeleton circle width={20} height={20} />
            <Skeleton width={50} height={20} />
          </div>

          <div className="flex gap-2 items-center">
            <Skeleton circle width={20} height={20} />
            <Skeleton width={60} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
