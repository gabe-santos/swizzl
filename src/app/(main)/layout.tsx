import Nav from '@/components/ui/nav';
import SearchBar from '@/components/ui/search-bar';
import RandomDrinkBtn from '@/components/buttons/random-drink-btn';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Nav>
				<SearchBar />
				<RandomDrinkBtn />
			</Nav>
			<main className='flex flex-col items-center'>
				<div className='max-w-screen-xl px-8 min-h-screen w-full'>
					{children}
				</div>
			</main>
		</>
	);
}
