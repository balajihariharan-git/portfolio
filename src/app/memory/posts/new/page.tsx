import { PostForm } from "@/components/admin/post-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return <PostForm />;
}
