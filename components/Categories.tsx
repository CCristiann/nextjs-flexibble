import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { categoryFilters } from '@/costants/costants'


const Categories = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    
    const categorySelected = searchParams.get('category')

    const handleFilterClick = (filter : string) => {
        if(filter === 'All') router.push('/')

        else router.push(`${pathName}?category=${filter}`)
    }
    
  return (
    <div className='flex justify-between w-full gap-5 flex-wrap'>
      <ul className='flex gap-2 overflow-auto'>
        <button
        onClick={() => handleFilterClick('All')}
        className={`${
          categorySelected !== null
          ? 'font-normal' : 'bg-gray-100 font-medium' }
          px-4 py-3 rounded-lg capitalize whitespace-nowrap`
        }
        >
            All
        </button>
        {categoryFilters.map((filter) => (
            <button 
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`${
                categorySelected === filter 
                ? 'bg-gray-100 font-medium' : 'font-normal' }
                px-4 py-3 rounded-lg capitalize whitespace-nowrap`
            }
            >
              {filter}
            </button>
        ))}
      </ul>
    </div>
  )
}

export default Categories
