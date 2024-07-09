export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className='flex flex-col items-center'>{children}</main>;
}
