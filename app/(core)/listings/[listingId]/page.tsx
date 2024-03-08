import getListingById from '@/actions/getListingById'
import { Container } from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'

interface IParams {
    listingId?: string
}

export default async function ListingPage({ params }: {params: IParams}) {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser()

    if (!listing) {
        return (
            <Container>
                <EmptyState />
            </Container>
        )
    }

    return (
        <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}
