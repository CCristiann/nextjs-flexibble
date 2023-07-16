"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { projectProps } from '@/interfaces/interfaces'

import ProjectCard from './ProjectCard'

type Props = {
  params: {
    id: string
  }
}

const RelatedProjects = ({ params } : Props) => {
  
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getRelatedProjects = async () => {
  
    const projectResponse = await fetch(`/api/project/${params.id}`)
    const project = await projectResponse.json()

    const response = await fetch(`/api/users/${project.creator._id}/projects`)
    const data = await response.json()

    const filteredRelatedProjects = data.filter((p: any) => p._id !== project._id)
    setProjects(filteredRelatedProjects)

    }

    getRelatedProjects()
  }, [params.id])

  if(projects){
  return (
    <div className='projects-grid'>
        {projects.map((relatedProject, i) => (
          <ProjectCard key={i} project={relatedProject}/>
        ))}
    </div>
  )
  }
}

export default RelatedProjects
