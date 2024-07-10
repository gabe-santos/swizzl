'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function addToFavorites(drinkId: string) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	// Get the current user
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { error: 'User not authenticated' };
	}

	// const drinkId = formData.get('drinkId') as string;

	if (!drinkId) {
		return { error: 'DrinkId is required' };
	}

	// Add the drink to favorites
	const { error } = await supabase
		.from('user_favorites')
		.upsert({ user_id: user.id, drink_id: drinkId });

	if (error) {
		console.error('Supabase error:', error);
		return { error: 'Failed to add favorite' };
	}

	// Revalidate the path to update the UI
	revalidatePath('/drink/[drinkId]');
	return { success: true };
}
