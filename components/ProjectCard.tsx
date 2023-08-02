"use client"

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getUserDetails } from '@/utils/actions'

const ProjectCard = ({ project } : any) => {
  
    const [randomLikes, setRandomLikes] = useState(0)
    const [randomViews, setRandomViews] = useState('')
    
    const [user, setUser] = useState<any>()


    useEffect(() => {
      setRandomLikes(Math.floor(Math.random() * 10000 ))
      setRandomViews(Math.floor(Math.random() * 10000) / 1000 + 'k')
    }, [])

    useEffect(() => {
      const getUser = async () => {
        const data = await getUserDetails(project.creator)

        setUser(data)
      }
      getUser()
    }, [project.creator])

    if(user) {
      return (
      <div className='flex flex-col gap-4'>
         <Link className='flex justify-center items-center relative w-full min-h-[265px] h-full' href={`/project/${project._id}`}>
           <Image 
           className='w-full h-full object-cover rounded-2xl shadow-md'
           src={project.image}
           width={414}
           height={314}
           alt={project.title}
         />
          
         </Link>
         <div className='flex justify-between items-center'>
           <div className='flex gap-2 items-center'>
             <Link href={`/profile/${user._id}`}>
               <Image
               className='rounded-full '
               src={user.image}
               width={32}
               height={32}
               alt='User Image'
               />
             </Link>
             <h4 className='font-semibold text-sm'>{user.username}</h4>  
           </div>
           <div className='flex gap-4'>
              <div className='flex gap-2'>
                <Image
                src='/assets/icons/hearth.svg'
                width={14}
                height={14}
                alt='Heart icon'
                />
                <p className='text-sm font-semibold'>{randomLikes}</p>
              </div>

              <div className='flex gap-2'>
                <Image
                src='/assets/icons/eye.svg'
                width={14}
                height={14}
                alt='Eye icon'
                />
                <p className='text-sm font-semibold'>{randomViews}</p>
              </div>
           </div>
         </div>
      </div>
  )
  }
}

export default ProjectCard
