import { Head } from "./head";

export default function PopupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed flex items-center justify-center w-screen h-screen">
      <Head />
      <main>{children}</main>
    </div>
  );
}
