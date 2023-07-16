import React, { MouseEventHandler } from 'react'

import Image from 'next/image'

type Props = {
    title: string
    type?: 'button' | 'submit'
    leftIcon?: string
    isSubmitting?: boolean
}
const Button = ({ title, type, leftIcon, isSubmitting } : Props) => {
  return (
    <button
    className={`form_btn ${isSubmitting ? 'bg-black/50' : 'bg-[#9747ff]'}`}
    type={type || 'button'}
    disabled={isSubmitting}
    >
        {leftIcon && (
            <Image 
            src={leftIcon}
            width={13}
            height={13}
            alt='Plus icon'
            />
        )}
        {title}
    </button>
  )
}

export default Button
