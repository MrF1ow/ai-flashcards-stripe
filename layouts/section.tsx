export default function SectionLayout({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="relative w-screen flex flex-col h-auto justify-center"
      style={{ backgroundColor: color }}
    >
      <main className="container mx-auto max-w-7xl px-6 flex-grow py-16">
        {children}
      </main>
    </div>
  );
}
