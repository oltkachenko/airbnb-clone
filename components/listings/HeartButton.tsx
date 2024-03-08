"use client"

import useFavorite from '@/hooks/useFavorite';
import type { SafeUser } from '@/types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null,
    listingName?: string
}

export default function HeartButton({ 
    listingId,
    currentUser,
    listingName
}: HeartButtonProps ) {
    const {hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser, listingName})

    return (
        <div 
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
                }
            />
        </div>
    );
}
