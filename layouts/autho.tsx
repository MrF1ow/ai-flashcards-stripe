import { Head } from "./head";

export default function AuthoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <main className="container mx-auto max-w-7xl px-6 flex pt-16 justify-center items-center">
        {children}
      </main>
    </div>
  );
}
