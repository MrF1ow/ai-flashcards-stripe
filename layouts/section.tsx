export default function SectionLayout({
  children,
  color,
  sectionRef,
}: {
  children: React.ReactNode;
  color?: string;
  sectionRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      className="relative w-screen flex flex-col h-auto justify-center"
      style={{ backgroundColor: color }}
      ref={sectionRef}
    >
      <main className="container mx-auto max-w-7xl px-6 flex-grow py-16">
        {children}
      </main>
    </div>
  );
}
