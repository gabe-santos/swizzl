'use client';
import { revalidate, signInWithPassword } from '@/lib/actions/auth';
import NextLink from 'next/link';
import { Button, Input, Link } from '@nextui-org/react';
import { useState, useTransition } from 'react';
import { redirect } from 'next/navigation';

export default function SignInForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>('');

	const handleSubmit = async (formData: FormData) => {
		// const formData = new FormData(event.target);
		console.log(formData.get('email'));

		startTransition(async () => {
			const result = await signInWithPassword(formData);
			if (result.error) {
				setError(result.error);
			} else {
				// revalidate();
				redirect('/');
			}
		});
	};

	return (
		<form action={handleSubmit} className='flex flex-col gap-16'>
			<div className='flex flex-col gap-4'>
				<Input
					autoFocus
					variant='bordered'
					label='Email'
					name='email'
				/>
				<Input
					variant='bordered'
					type='password'
					label='Password'
					name='password'
				/>
				<Link
					as={NextLink}
					href='/forgot-password'
					color='primary'
					className='w-fit'>
					Forgot password?
				</Link>
				{/* Dumb fix */}
				{/* <Input
					className='opacity-0'
					variant='bordered'
					label='ignore'
				/> */}
				{error && <p className='text-danger'>{error}</p>}
			</div>

			<div className='flex'>
				<Button
					fullWidth
					type='submit'
					color='primary'
					size='lg'
					isLoading={isPending}>
					Sign in
				</Button>
			</div>
		</form>
	);
}
