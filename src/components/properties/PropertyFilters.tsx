"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

interface PropertyFiltersProps {
  locale: string;
  currentParams: Record<string, string | undefined>;
}

export default function PropertyFilters({
  locale,
  currentParams,
}: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHR = locale === "hr";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams();
      Object.entries(currentParams).forEach(([k, v]) => {
        if (v && k !== key) params.set(k, v);
      });
      if (value) params.set(key, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [currentParams, pathname, router]
  );

  const resetFilters = () => {
    router.push(pathname);
  };

  const hasFilters = Object.values(currentParams).some(Boolean);

  return (
    <div className="bg-[#F8F8F8] p-6 border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            {isHR ? "Lokacija" : "Location"}
          </label>
          <input
            type="text"
            placeholder={isHR ? "Npr. Zagreb" : "E.g. Zagreb"}
            defaultValue={currentParams.location || ""}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Transaction type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            {isHR ? "Vrsta transakcije" : "Transaction"}
          </label>
          <select
            value={currentParams.transaction || ""}
            onChange={(e) => updateFilter("transaction", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white"
          >
            <option value="">{isHR ? "Sve" : "All"}</option>
            <option value="SALE">{isHR ? "Prodaja" : "For Sale"}</option>
            <option value="RENT">{isHR ? "Najam" : "For Rent"}</option>
          </select>
        </div>

        {/* Property type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            {isHR ? "Vrsta nekretnine" : "Property type"}
          </label>
          <select
            value={currentParams.type || ""}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white"
          >
            <option value="">{isHR ? "Sve" : "All"}</option>
            <option value="APARTMENT">{isHR ? "Stan" : "Apartment"}</option>
            <option value="HOUSE">{isHR ? "Kuća" : "House"}</option>
            <option value="LAND">{isHR ? "Zemljište" : "Land"}</option>
            <option value="COMMERCIAL">{isHR ? "Poslovni prostor" : "Commercial"}</option>
            <option value="LUXURY_VILLA">{isHR ? "Luksuzna villa" : "Luxury Villa"}</option>
            <option value="NEW_BUILD">{isHR ? "Novogradnja" : "New Build"}</option>
          </select>
        </div>

        {/* Min price */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            {isHR ? "Min. cijena (EUR)" : "Min price (EUR)"}
          </label>
          <input
            type="number"
            placeholder="0"
            defaultValue={currentParams.minPrice || ""}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-[#D4AF37] transition-colors underline"
          >
            {isHR ? "Resetiraj filtere" : "Reset filters"}
          </button>
        </div>
      )}
    </div>
  );
}
