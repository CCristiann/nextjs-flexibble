import React from "react";
import Skeleton from "react-loading-skeleton";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

const ProjectPageSkeleton = () => {
  const loadingArray = ["", "", "", ""];
  return (
    <>
      <section className="max-w-5xl w-full mx-auto flex flex-col gap-8">
        <section className="flex gap-4">
          <Skeleton circle width={44} height={44} />
          <div className="flex flex-col gap-1">
            <Skeleton width={80} height={18} />
            <Skeleton width={150} height={18} />
          </div>
        </section>
        <section className="flex flex-col gap-10">
          <div className="w-full h-[230px] md:h-[250px] lg:h-[600px]">
            <Skeleton className="w-full h-full object-contain" />
          </div>
        </section>
      </section>

      <section className="w-full flex flex-row justify-center items-center gap-8 my-16 md:my-20">
        <Skeleton circle width={60} height={60} />
      </section>

      <section className="w-full">
        <div className="w-full flex justify-between">
          <Skeleton width={150} height={20} />
          <Skeleton width={70} height={20} />
        </div>

        <div className="projects-grid">
          {loadingArray.map((project, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProjectPageSkeleton;
