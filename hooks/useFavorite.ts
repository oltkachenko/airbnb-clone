import type { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null,
    listingName?: string
}

const useFavorite = ({
    listingId,
    currentUser,
    listingName
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request();
            router.refresh();
            if (hasFavorited) {
                toast.success(`"${listingName}" removed from favorites`)
            } else {
                toast.success(`"${listingName}" added to favorites`)
            }
        } catch (error) {
            toast.error('Somethng went wrong')
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;