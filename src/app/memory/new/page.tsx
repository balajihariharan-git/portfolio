import { MemoryForm } from "@/components/admin/memory-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Memory Entry",
  robots: { index: false, follow: false },
};

export default function NewMemoryPage() {
  return <MemoryForm />;
}
