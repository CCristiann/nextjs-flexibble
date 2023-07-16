"use client"

import React, { ReactNode, useCallback, useRef } from 'react'

import { useRouter }from 'next/navigation'

import { MdClose } from 'react-icons/md'

type Props = {
    children: ReactNode
}

const Modal = ({ children } : Props) => {

    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const onClose = useCallback(() => {
        router.push('/')
    }, [router])

    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if(e.target === overlay.current && onClose){
            onClose()
        }
    }, [onClose, overlay])

  return (
    <div 
    ref={overlay}
    onClick={handleOverlayClick}
    className='modal_overlay'
    >
        <MdClose
        className='absolute top-3 right-5 text-3xl text-white' 
        onClick={onClose}
        />

        <div 
        ref={wrapper}
        className='modal_wrapper'
        >
            { children }
        </div>
    </div>
  )
}

export default Modal
