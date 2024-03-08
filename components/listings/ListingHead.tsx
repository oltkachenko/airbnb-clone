"use client"

import type { SafeUser } from '@/types';
import { Heading } from '../common/Heading';
import Image from 'next/image';
import useCountries from '@/hooks/useCountries';
import HeartButton from './HeartButton';

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null
}

export default function ListingHead({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}: ListingHeadProps) {
    const { getCountryByValue } = useCountries();

    const location = getCountryByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    alt={title}
                />
                <div className="absolute top-5 right-5">
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                        listingName={title}
                    />
                </div>
            </div>
        </>
    )
}
