export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='flex flex-col w-full min-h-screen items-center'>
			{children}
		</main>
	);
}
