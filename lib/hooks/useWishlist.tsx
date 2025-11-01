import { useCreateWishlistMutation } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useWishlist(code: string | number) {
    const [createWishlist, { error }] = useCreateWishlistMutation();
    const { email } = useAppSelector((state) => state.user);
    const [heart, setHeart] = useState(false);
    const { wishlist } = useAppSelector((state) => state.wishlist);
    const router = useRouter();

    useEffect(() => {
        if (wishlist?.length && wishlist.some((item) => item['id'] === code)) {
            setHeart(true);
        }
        if (error) {
            setHeart(false);
        }
    }, [wishlist, error, code]);

    const handleWishlist = async () => {
        if (!email) {
            router.push('/login');
            return;
        }

        await createWishlist(code);
    };

    return { handleWishlist, heart, setHeart };
}
