import { Navbar, NavbarBrand, NavbarItem } from '@nextui-org/navbar';
import Link from 'next/link';
import UserDropdown from './user-dropdown';
import { getUser } from '@/lib/actions/auth';
import { Button } from '@nextui-org/react';

export default async function Nav({ children }: { children: React.ReactNode }) {
	const user = await getUser();

	return (
		<Navbar
			shouldHideOnScroll
			maxWidth='full'
			isBlurred
			className='flex items-center gap-8 py-2 mb-8'>
			<NavbarBrand className='flex-grow-0'>
				<Link href='/' className='text-3xl font-medium'>
					swizzl🍹
				</Link>
			</NavbarBrand>

			<NavbarItem className='flex-grow gap-1 flex justify-center px-12 max-w-screen-lg'>
				{children}
			</NavbarItem>

			<NavbarItem>
				{user ? (
					<UserDropdown name={user.user_metadata.first_name} />
				) : (
					<Button as={Link} href='/signin' variant='light' size='lg'>
						Sign In
					</Button>
				)}
			</NavbarItem>
		</Navbar>
	);
}
