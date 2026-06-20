"use client";

import { useRouter } from "next/navigation";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"];

export default function UpdateLeadStatusButton({
  messageId,
  currentStatus,
}: {
  messageId: string;
  currentStatus: string;
}) {
  const router = useRouter();

  const handleChange = async (status: string) => {
    await fetch(`/api/admin/messages/${messageId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  return (
    <select
      defaultValue={currentStatus}
      onChange={(e) => handleChange(e.target.value)}
      className="text-xs border border-gray-200 px-2 py-1 bg-white focus:outline-none focus:border-[#D4AF37]"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
