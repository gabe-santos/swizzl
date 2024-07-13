import Nav from "@/components/ui/nav";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center">
        <div className="max-w-screen-xl px-8 min-h-screen w-full relative">
          {children}
        </div>
      </main>
    </>
  );
}
