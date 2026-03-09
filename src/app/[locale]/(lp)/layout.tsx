import { LpNavbar } from "@/components/layout/LpNavbar";
import { LpFooter } from "@/components/layout/LpFooter";

export default function LpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LpNavbar />
      <main>{children}</main>
      <LpFooter />
    </>
  );
}
