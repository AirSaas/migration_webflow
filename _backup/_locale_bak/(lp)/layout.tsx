import { LpNavbar } from "@/components/_legacy/layout/LpNavbar";
import { LpFooter } from "@/components/_legacy/layout/LpFooter";

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
