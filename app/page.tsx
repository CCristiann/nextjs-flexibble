"use client";
import React, { useEffect, useState } from "react";

import ProjectCard from "@/components/ProjectCard";

import "react-loading-skeleton/dist/skeleton.css";
import ProjectCardSkeleton from "@/components/skeleton/ProjectCardSkeleton";
import { getAllProjects } from "@/utils/actions";

export default function Home() {
  const [projects, setProjects] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const loadingArray = ["", "", "", "", "", "", "", ""];

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects()

      if(data.length !== 0) setProjects(data)
      
    };
    fetchProjects();

    setTimeout(() => {
      setIsLoading(false)
    }, 700)
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="projects-grid">
          {loadingArray.map((item, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
        {projects && (
        <div className="projects-grid">
          {projects.map((project: any, i: number) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
        )}
        </>
      )}
    </section>
  );
}
