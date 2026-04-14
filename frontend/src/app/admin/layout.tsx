import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | SBPL - Shivay BioIndhan Pvt Ltd",
  description: "Admin dashboard for managing partnership applications and analytics.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
