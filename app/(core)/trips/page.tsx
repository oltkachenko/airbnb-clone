import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations';
import { Container } from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import React from 'react'
import TripsClient from './TripsClient';

export default async function TripsPage() {
    const currentUser = await getCurrentUser();
    const reservations = await getReservations({ userId: currentUser?.id });

    if (!currentUser) {
        return (
            <Container>
                <EmptyState 
                    title='Unauthorized'
                    subtitle='Please login'
                />
            </Container>
        )
    }

    if (reservations.length === 0) {
        return (
            <Container>
                <EmptyState 
                    title='No trips found'
                    subtitle='Looks like you havent reserved any trips.'
                />
            </Container>
        )
    }



    return (
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}
