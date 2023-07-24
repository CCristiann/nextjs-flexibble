"use client";
import React, { useEffect, useState } from "react";

import { getAllProjects } from "@/utils/actions";

import "react-loading-skeleton/dist/skeleton.css";
import ProjectCardSkeleton from "@/components/skeleton/ProjectCardSkeleton";
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { toast } from "react-toastify";

type SearchParamsProps = {
  category?: string
}

type Props = {
  searchParams: SearchParamsProps
}
export default function Home({ searchParams: { category }} : Props) {
  const [projects, setProjects] = useState([{}])
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false)

  const loadingArray = ["", "", "", "", "", "", "", ""];

  useEffect(() => {
    const fetchProjects = async () => {
      setIsFiltering(false)
      const data = await getAllProjects()

      if(data.length !== 0) {
        if(category){
          const filteredProjects = data.filter((p : any) => p.category === category)
          setIsFiltering(true)
          setProjects(filteredProjects)
        } else {
          setProjects(data)
        }

      
      }
    };
    fetchProjects();

    setIsLoading(false)
  }, [category]);
  
  return (
    <section>
      <Categories />
      {isLoading ? (
        <div className="projects-grid">
          {loadingArray.map((item, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
        {projects.length !== 0 ? (
          <>
          {isFiltering && (
            <p 
            className="mt-10 font-medium"
            >
              Results on: 
              <span
              className="text-[#9747ff] font-semibold"
              >
                &nbsp;{category}
              </span>
            </p>
          )}
          <div className="projects-grid">
            {projects.map((project: any, i: number) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
          </>
        ) : (
          <div className="max-w-fit w-full mx-auto h-full">
            <h4 className="font-semibold text-md md:text-xl mt-64 w-full text-center">No projects found, go create some first!</h4>
          </div>
        )}
        </>
      )}
    </section>
  );
}
