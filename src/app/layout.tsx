import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import './globals.css';
import Nav from '@/components/nav';
import SearchBar from '@/components/search-bar';
import RandomDrinkBtn from '@/components/random-drink-btn';
import { Providers } from './providers';
import clsx from 'clsx';

const fraunces = Fraunces({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'swizzl',
	description: 'A cocktail recipe library',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={clsx(
					fraunces.className,
					'flex flex-col items-center w-full font-light'
				)}>
				<Nav>
					<SearchBar />
					<RandomDrinkBtn />
				</Nav>
				<div className='w-full flex flex-col max-w-screen-xl items-center px-6'>
					<Providers>{children}</Providers>
				</div>
			</body>
		</html>
	);
}
