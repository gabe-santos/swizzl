import { revalidate, signUpNewUser } from '@/lib/actions/auth';
import NextLink from 'next/link';
import { Button, Input, Link } from '@nextui-org/react';
import { useTransition, useState } from 'react';
import { redirect } from 'next/navigation';

export default function SignUpForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>('');

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		console.log(formData.get('email'));

		startTransition(async () => {
			const result = await signUpNewUser(formData);
			if (result.error) {
				setError(result.error);
			} else {
				// revalidate();
				redirect('/');
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-16'>
			<div className='flex flex-col gap-4 flex-1'>
				<Input autoFocus variant='bordered' label='Name' name='name' />
				<Input variant='bordered' label='Email' name='email' />
				<Input
					variant='bordered'
					type='password'
					label='Password'
					name='password'
				/>
				{error && <p className='text-danger'>{error}</p>}
			</div>
			<div className='flex w-full'>
				<Button
					fullWidth
					type='submit'
					color='primary'
					size='lg'
					isLoading={isPending}>
					Sign up
				</Button>
			</div>
		</form>
	);
}
