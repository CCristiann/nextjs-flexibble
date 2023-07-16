"use client"

import React from 'react'

import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'
import { useSession } from 'next-auth/react'

const CreateProject = () => {

  const { data: session }  = useSession()

  return (
    <Modal>
        <h4 className='font-bold text-3xl md:text-5xl max-w-5xl mx-auto w-full'>Create a New Project</h4>

        <ProjectForm 
        type='create'
        session={session}
        />
    </Modal>
  )
}

export default CreateProject
