interface StatsSectionProps {
  locale: string;
}

const stats = [
  { valueHR: "200+", labelHR: "Zadovoljnih klijenata", labelEN: "Happy clients", valueEN: "200+" },
  { valueHR: "150+", labelHR: "Prodanih nekretnina", labelEN: "Properties sold", valueEN: "150+" },
  { valueHR: "10+", labelHR: "Godina iskustva", labelEN: "Years of experience", valueEN: "10+" },
  { valueHR: "3", labelHR: "Aktivne lokacije", labelEN: "Active locations", valueEN: "3" },
];

export default function StatsSection({ locale }: StatsSectionProps) {
  return (
    <section className="py-16 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-playfair text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">
                {locale === "hr" ? stat.valueHR : stat.valueEN}
              </div>
              <div className="text-gray-400 text-sm">
                {locale === "hr" ? stat.labelHR : stat.labelEN}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
