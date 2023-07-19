"use client";
import { connectToDB } from "@/utils/database";
import React, { useEffect, useState } from "react";

import ProjectCard from "@/components/ProjectCard";

import Image from "next/image";

import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "@/components/skeleton/ProjectCardSkeleton";
import ProjectCardSkeleton from "@/components/skeleton/ProjectCardSkeleton";

export default function Home() {
  const [projects, setProjects] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const loadingArray = ["", "", "", "", "", "", "", ""];

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/project");
      const data = await response.json();

      setProjects(data);
      
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    };
    fetchProjects();
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
        <div className="projects-grid">
          {projects.map((project: any, i: number) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
