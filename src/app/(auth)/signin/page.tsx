import SignInCard from '@/components/ui/sign-in-card';
import { getUser } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
	const user = await getUser();
	if (user) {
		redirect('/');
	}

	return (
		<div className='max-w-screen-sm min-h-screen w-full flex-1 p-8 flex flex-col justify-center items-center'>
			<SignInCard />
		</div>
	);
}
