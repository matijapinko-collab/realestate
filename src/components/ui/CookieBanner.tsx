"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("cookie");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] text-white px-4 py-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">{t("message")}</p>
        <button
          onClick={handleAccept}
          className="flex-shrink-0 px-6 py-2 bg-[#D4AF37] text-white text-sm font-semibold hover:bg-[#B8972E] transition-colors"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
