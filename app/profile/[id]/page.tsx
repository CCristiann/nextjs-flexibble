"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import ProjectCard from '@/components/ProjectCard'

type Props = {
    params: {
        id: string
    }
}
const ProfilePage = ({ params } : Props) => {

  const { data : session } = useSession()

  const [user, setUser] = useState<any>()
  const [projects, setProjects] = useState<any>()

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/user/${params.id}`)
      const data = await response.json()

      setUser(data)
      
    }
    getUserDetails()
  }, [params.id])

  useEffect(() => {
    const getRelatedProjects = async () => {
      const response = await fetch(`/api/users/${params.id}/projects`)
      const data = await response.json()

      setProjects(data)
    }

    getRelatedProjects()
  }, [params.id])

  return (
    <section className='w-full flex flex-col gap-16 paddings mb-20'>
      <div className='flex flex-wrap items-center gap-20 w-full justify-between'>
        <div className='flex flex-col gap-12'>
          <Image
          className='rounded-full' 
          src={user?.image}
          width={90}
          height={90}
          alt='User Image'
          />
          <p className='text-3xl md:text-5xl font-[800]'>Hi I'm <br></br>{user?.username} 👋</p>

          <div className='flex gap-4'>
            <button 
              className='flex gap-4 bg-slate-200 md:px-5 md:py-3 px-4 py-2 items-center rounded-xl text-black font-medium text-sm'
              >
              Follow
            </button>
            <button
              className='flex gap-4 bg-[#9747ff] px-5 py-3 rounded-xl text-white font-medium text-sm'
            >
              Hire me
            </button>
          </div>
        </div>
        <div>
          <Image 
          className='object-contain rounded-xl'
          src={user?.projects[0].image}
          width={739}
          height={554}
          alt='Project Image'
          />
        </div>
      </div>

      {projects && (
        <section>
          <h4 className='font-semibold text-lg'>Recent Work</h4>
          <div className='projects-grid'>
          {projects.map((relatedProject: any, i: number) => (
            <ProjectCard key={i} project={relatedProject}/>
          ))}
         </div>
       </section>
      )}

    </section>
  )
}

export default ProfilePage
