"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "385"; // placeholder
  const message = encodeURIComponent(
    "Pozdrav Matija, zanima me više o vašim uslugama."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1ebe5d] transition-colors"
      aria-label="WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
