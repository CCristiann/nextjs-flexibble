"use client"

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'

import { getProjectDetails } from '@/utils/actions'

type Props = {
    params: {
        id: string
    }
}

const EditProject = ({ params } : Props) => {
    const { data: session } = useSession()

    if(!session?.user) redirect('/')

    const [projectData, setProjectData] = useState<any>()

    useEffect(() => {
        const getProject = async () => {
            const data = await getProjectDetails(params.id)

            setProjectData(data)
        }
        
        getProject()
    }, [])

  return (
    <Modal>
        <h4 className="font-bold text-3xl md:text-5xl max-w-5xl mx-auto w-full">
           Edit Project
        </h4>
        <ProjectForm 
          type='edit'
          session={session}
          projectData={projectData}
        />
    </Modal>
  )
}

export default EditProject
