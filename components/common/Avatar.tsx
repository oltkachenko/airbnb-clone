import Image from 'next/image'
import React from 'react'

interface AvatarProps {
    src: string | null | undefined
}

export default function Avatar({ 
    src 
}: AvatarProps ) {
    return (
        <Image
            src={src || "/images/placeholder.jpg"}
            alt='Avatar'
            height="30"
            width="30"
            className='rounded-full'
        />
    )
}
