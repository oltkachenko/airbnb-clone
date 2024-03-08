import { Container } from '@/components/Container';
import { Logo } from '@/components/header/Logo';
import { Search } from '@/components/header/Search';
import { UserMenu } from '@/components/header/UserMenu';
import type { SafeUser } from '@/types';
import Categories from '../categories/Categories';

interface HeaderProps {
    currentUser?: SafeUser | null
}

export function Header({
    currentUser
}: HeaderProps) {
    return (
        <div className='sticky top-0 w-full bg-white z-10 shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}
