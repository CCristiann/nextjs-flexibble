"use client";

import React, { useEffect, useState } from "react";

import ProjectCard from "./ProjectCard";

import { getRelatedProjects } from "@/utils/actions";
import { StringExpression } from "mongoose";

import { userProps } from "@/interfaces/interfaces";

const RelatedProjects = ({ user } : userProps) => {

  const [projects, setProjects] = useState<any>()

  useEffect(() => {
    const getProjects = async () => {
      const data = await getRelatedProjects(user._id);

      if(data.length !== 0) setProjects(data)
    };

    getProjects();
  }, [user._id]);

  return (
    <>
    {projects && (
      <div className="projects-grid">
        {projects.map((relatedProject : any, i : number) => (
          <ProjectCard key={i} project={relatedProject} />
        ))}
      </div>
    )}
    </>
  );
};

export default RelatedProjects;
