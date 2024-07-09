'use client';
import SignInForm from '@/components/forms/sign-in-form';
import SignUpForm from '@/components/forms/sign-up-form';
import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';

export default function SignInCard() {
	const [selected, setSelected] = useState('signin');

	return (
		<Card className='w-full min-h-[500px] px-4 py-6 flex flex-col'>
			<CardHeader className='font-medium text-xl'>{selected}</CardHeader>
			<CardBody className='flex-grow p-0'>
				<Tabs
					size='lg'
					selectedKey={selected}
					onSelectionChange={value => setSelected(value.toString())}
					className='h-full flex flex-col'>
					<Tab key='Sign In' title='Sign In' className='h-full'>
						<div className='h-full py-4'>
							<SignInForm />
						</div>
					</Tab>
					<Tab key='Sign Up' title='Sign Up' className='h-full'>
						<div className='h-full py-4'>
							<SignUpForm />
						</div>
					</Tab>
				</Tabs>
			</CardBody>
		</Card>
	);
}
