'use server';

import { AuthResult } from '@/types/auth';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { z } from 'zod';

const SignInSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password cannot be empty'),
});

const SignUpSchema = z.object({
	name: z.string().min(1, 'Name cannot be empty').max(25, 'Name too long'),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(50, 'Password too long'),
});

export async function signInWithPassword(
	formData: FormData
): Promise<AuthResult> {
	const validation = SignInSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validation.success) {
		const errors = validation.error.issues.map(issue => issue.message);
		return { error: errors.join(',') };
	}

	const { email, password } = validation.data;

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { error: error.message };
	}

	console.log('successfully signed in ', data.user.email);
	return { success: true };
}

export async function signUpNewUser(formData: FormData) {
	const validation = SignUpSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validation.success) {
		const errors = validation.error.issues.map(issue => issue.message);
		return { error: errors.join(',') };
	}

	const { name, email, password } = validation.data;

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase.auth.signUp({
		email: email!.toString(),
		password: password!.toString(),
		options: {
			data: {
				first_name: name,
			},
		},
	});

	if (error) {
		return { error: error.message };
	}
	console.log('successfully signed up', data.user?.email);
	return { success: true };
}

export async function signOutUser() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { error } = await supabase.auth.signOut();

	if (error) {
		return { error: error.message };
	}

	console.log('successfully signed out');
	return { success: true };
}

export async function revalidate() {
	revalidatePath('/', 'layout');
}

export const getUser = cache(async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase.auth.getUser();

	return data.user;
});
