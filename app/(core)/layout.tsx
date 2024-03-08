import { Header } from '@/components/header/Header'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import React from 'react'
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from '@/components/modals/RentModal';
import SearchModal from '@/components/modals/SearchModal';




export default async function CoreLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser()

    return (
        <>
            <Header currentUser={currentUser} />

            <div>
                {children}
            </div>

            <SearchModal />
            <RegisterModal />
            <LoginModal />
            <RentModal />
        </>
    )
}
