"use client"

import useCountries from '@/hooks/useCountries';
import type { SafeListing, SafeReservations, SafeUser } from '@/types';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import Button from '../common/Button';
import Image from 'next/image';
import HeartButton from './HeartButton';

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservations;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

export default function ListingCard({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}: ListingCardProps) {
    const router = useRouter();
    const { getCountryByValue } = useCountries();

    const location = getCountryByValue(data.locationValue);

    const handleCancel = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId)
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }

        return data.price
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])

    return (
        <div 
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                        fill
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                        src={data.imageSrc}
                        alt="Listing"
                    /> 
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}
                            listingName={data.title}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel} 
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}
