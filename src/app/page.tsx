import DrinksGrid from '@/components/drinks-grid';
import Nav from '@/components/nav';
import RandomDrinkBtn from '@/components/random-drink-btn';
import SearchBar from '@/components/search-bar';
import { getDrinks } from '@/lib/queries/drinks';

export default async function Home({
	searchParams,
}: {
	searchParams?: { query?: string };
}) {
	const query = searchParams?.query || '';
	const res = await getDrinks(query);
	const drinks = res.drinks;

	return (
		<>
			<DrinksGrid drinks={drinks} />
		</>
	);
}
