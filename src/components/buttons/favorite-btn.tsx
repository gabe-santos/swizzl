'use client';

import { Button } from '@nextui-org/react';
import { Heart } from 'lucide-react';
import { addToFavorites } from '@/lib/actions/favorites';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function FavoriteBtn({ drinkId }: { drinkId: string }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		startTransition(async () => {
			const result = await addToFavorites(drinkId);

			if (result.error) {
				// Handle error (e.g., show a toast notification)
				console.error(result.error);
			} else {
				// Handle success (e.g., show a success message)
				console.log('Added to favorites');
				router.refresh(); // Refresh the page to reflect the new favorite status
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button
				type='submit'
				variant='flat'
				startContent={<Heart color='#ef4444' />}
				isLoading={isPending}>
				{isPending ? 'Adding...' : 'Add to Favorites'}
			</Button>
		</form>
	);
}
