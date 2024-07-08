import { Navbar, NavbarBrand, NavbarItem } from '@nextui-org/navbar';
import SearchBar from './search-bar';
import RandomDrinkBtn from './random-drink-btn';
import Link from 'next/link';
import SignInBtn from './sign-in-btn';
import UserDropdown from './user-dropdown';
import { getUser } from '@/lib/actions/auth';

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
					<SignInBtn />
				)}
			</NavbarItem>
		</Navbar>
	);
}
