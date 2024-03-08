import db from "@/libs/db";


interface IParams {
    listingId?: string
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = params;

        const listing = await db.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true
            }
        });

        if (!listing) {
        return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toString(),
            user: {
              ...listing.user,
              createdAt: listing.user.createdAt.toString(),
              updatedAt: listing.user.updatedAt.toString(),
              emailVerified: 
                listing.user.emailVerified?.toString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}