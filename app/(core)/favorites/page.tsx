import getCurrentUser from '@/actions/getCurrentUser'
import getFavoriteListings from '@/actions/getFavoriteListings';
import { Container } from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import FavoritesClient from './FavoritesClient';

export default async function FavoritesPage() {
    const currentUser = await getCurrentUser();
    const favorites = await getFavoriteListings();

    if (favorites.length === 0) {
        return (
            <Container>
                <EmptyState 
                    title='No favorites found'
                    subtitle='Looks like you have no favorite listings.'
                />
            </Container>
        )
    }

    return (
        <Container>
            <FavoritesClient
                listings={favorites}
                currentUser={currentUser}
            />
        </Container>
    )
}
