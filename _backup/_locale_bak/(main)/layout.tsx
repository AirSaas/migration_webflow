import { Navbar } from "@/components/_legacy/layout/Navbar";
import { Footer } from "@/components/_legacy/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
