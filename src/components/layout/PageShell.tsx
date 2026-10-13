import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}