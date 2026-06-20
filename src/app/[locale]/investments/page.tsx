import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investment Properties",
  description: "Successful property investing isn't about finding a good property. It's about finding a property that makes sense.",
};

const metrics = [
  {
    title: "Rental Demand",
    desc: "What does the rental market look like, and is demand likely to grow or shrink?",
  },
  {
    title: "Resale Liquidity",
    desc: "How liquid will this asset be if you decide to sell in five or ten years?",
  },
  {
    title: "Location Trajectory",
    desc: "What infrastructure projects are planned? Where is demand likely to move?",
  },
  {
    title: "Competing Inventory",
    desc: "How much competing supply exists, and what does that mean for your returns?",
  },
  {
    title: "Maintenance Costs",
    desc: "What will the property cost annually when it's not generating income?",
  },
  {
    title: "Value Growth Logic",
    desc: "Is there a fundamental reason this location should be worth more in a decade?",
  },
];

export default function InvestmentsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Investments</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Not Every Property Is an Investment.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Some properties preserve wealth. Some properties generate income. Some properties appreciate significantly over time. And some properties quietly consume far more money than their owners ever expected. The challenge is that all four can look remarkably similar when you&apos;re standing inside them.
          </p>
          <p>
            That&apos;s why investing in real estate requires a different mindset than buying a home. When you&apos;re purchasing a property for yourself, emotion is part of the equation. An investment property is different. An investment property should primarily be evaluated through the lens of performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
          {metrics.map((item) => (
            <div key={item.title} className="p-6 bg-[#F8F8F8]">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Those questions matter far more than whether the kitchen looks impressive. Unfortunately, many investors focus on visible details while overlooking the factors that ultimately drive returns. That&apos;s where strategy becomes important.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;I don&apos;t believe in chasing every opportunity. I believe in understanding why an opportunity exists in the first place.&rdquo;
          </p>
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Whether you&apos;re considering your first investment property or expanding an existing portfolio, the objective remains the same: make decisions based on fundamentals rather than emotion. Because successful property investing isn&apos;t about finding a good property. It&apos;s about finding a property that makes sense.
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Let&apos;s Evaluate the Opportunity</h2>
          <p className="text-gray-600 mb-6">
            If you&apos;re thinking about investing in property, get in touch and we&apos;ll assess together whether the opportunity you&apos;re looking at has real investment logic behind it.
          </p>
          <Link href="/en/contact" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
