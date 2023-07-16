"use client"

import { formProps } from '@/interfaces/interfaces'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const ProjectCard = ({ project } : any) => {

    const [randomLikes, setRandomLikes] = useState(0)
    const [randomViews, setRandomViews] = useState('')

    useEffect(() => {
      setRandomLikes(Math.floor(Math.random() * 10000 ))
      setRandomViews(Math.floor(Math.random() * 10000) / 1000 + 'k')
    }, [])
   return (
    <div className='flex flex-col gap-4'>
       <Link className='flex justify-center items-center relative w-full h-full' href={`/project/${project._id}`}>
         <Image 
         className='w-full h-full object-cover rounded-xl'
         src={project.image}
         width={414}
         height={314}
         alt={project.title}
       />
        <div className='flex profile-card_title'>
          <p className='w-full'>{project.title}</p>
        </div>
       </Link>
       <div className='flex justify-between items-center'>
         <div className='flex gap-4 items-center'>
           <Link href={`/profile/${project.creator._id}`}>
             <Image
             className='rounded-full '
             src={project.creator.image}
             width={32}
             height={32}
             alt='User Image'
             />
           </Link>
           <h4 className='font-semibold text-sm md:text-base'>{project.creator.name}</h4>  
         </div>
         <div className='flex gap-4'>
            <div className='flex gap-2'>
              <Image
              src='/assets/icons/hearth.svg'
              width={14}
              height={14}
              alt='Heart icon'
              />
              <p className='text-sm'>{randomLikes}</p>
            </div>

            <div className='flex gap-2'>
              <Image
              src='/assets/icons/eye.svg'
              width={14}
              height={14}
              alt='Eye icon'
              />
              <p className='text-sm'>{randomViews}</p>
            </div>
         </div>
       </div>
    </div>
  )
}

export default ProjectCard
