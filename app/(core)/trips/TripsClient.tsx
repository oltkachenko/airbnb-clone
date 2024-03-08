'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/common/Heading";
import ListingCard from "@/components/listings/ListingCard";
import type { SafeReservations, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface TripsClientProps {
    reservations: SafeReservations[],
    currentUser?: SafeUser | null,
}

export default function TripsClient({
    reservations,
    currentUser
}: TripsClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh()
            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router])

    return (
        <Container>
            <div className='pt-4'>
                <Heading
                    title="Trips"
                    subtitle="Where you've been and where you're going"
                />
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {reservations.map((reservation: any) => (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel reservation"
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </div>
        </Container>
       );
}

