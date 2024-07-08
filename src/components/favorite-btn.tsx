import { Button } from '@nextui-org/react';
import { Heart } from 'lucide-react';

export default function FavoriteBtn() {
	return (
		<form action=''>
			<Button variant='flat' startContent={<Heart color='#ef4444' />}>
				Add to Favorites
			</Button>
		</form>
	);
}
