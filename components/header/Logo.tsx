"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export function Logo() {
    const router = useRouter()

    return (
        <Image 
            onClick={() => router.push('/')}
            src="/images/logo.png"
            alt="Logo"
            height="31"
            width="100"
            className='md:block cursor-pointer'
        />
    )
}
