import React from 'react'
import Skeleton from 'react-loading-skeleton'
import ProjectCardSkeleton from './ProjectCardSkeleton'

const ProfilePageSkeleton = () => {
  const loadingArray = ['', '', '', '']

  return (
    <>
    <div className="flex flex-wrap items-center gap-20 w-full justify-between">
        <div className="flex flex-col gap-12">
          <Skeleton
            circle
            width={90}
            height={90}
          />
          <Skeleton width={120} height={20}/> 
          <Skeleton width={120} height={20} />

          <div className="flex gap-4">
            <Skeleton width={80} height={40}/>
            <Skeleton width={80} height={40}/>
          </div>
        </div>
        <div className='lg:w-[739px] w-full h-[554px]'>
          <Skeleton
            className="rounded-xl w-full h-full"
          />
        </div>  
      </div>

      <section>
        <Skeleton width={100} height={20} />
        <div className="projects-grid">
          {loadingArray.map((project, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
        </section>
        </>
  )
}

export default ProfilePageSkeleton
