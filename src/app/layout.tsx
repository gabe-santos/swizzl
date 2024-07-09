import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import clsx from 'clsx';
import RandomDrinkBtn from '@/components/buttons/random-drink-btn';
import Nav from '@/components/ui/nav';
import SearchBar from '@/components/ui/search-bar';

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
			<body className={clsx(fraunces.className, 'font-light')}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
