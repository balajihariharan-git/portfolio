"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteMemoryButtonProps {
  entryId: string;
  entryTitle: string;
}

export function DeleteMemoryButton({ entryId, entryTitle }: DeleteMemoryButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/memory/${entryId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/memory");
        router.refresh();
      } else {
        alert("Failed to delete entry");
      }
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="text-xs text-red-500">Delete &ldquo;{entryTitle}&rdquo;?</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs font-medium text-red-500 hover:text-red-400"
        >
          {deleting ? "..." : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500/70 transition-colors hover:text-red-500"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}
