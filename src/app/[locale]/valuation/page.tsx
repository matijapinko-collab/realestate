import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Valuation",
  description: "A meaningful valuation isn't a guess. It's a market position.",
};

const metrics = [
  {
    title: "Competing Inventory",
    desc: "What similar properties are listed and selling for — and why the difference matters.",
  },
  {
    title: "Recent Transactions",
    desc: "Actual sale prices, not asking prices. The market doesn't care what sellers hoped to get.",
  },
  {
    title: "Buyer Demand",
    desc: "Who is actively looking, what they value, and what drives their decision.",
  },
  {
    title: "Market Position",
    desc: "How your property compares to alternatives in the eyes of the most likely buyer.",
  },
];

export default function ValuationPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Valuation</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            A Property Is Worth What the Market Will Pay. Not What You Hope For.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            One of the most expensive mistakes property owners make happens before the property ever reaches the market. It usually starts with a simple question: &ldquo;How much do you think it&apos;s worth?&rdquo; The problem is that most people end up asking the wrong people. They ask friends. They ask neighbors. They compare their property to a few listings they found online and try to reverse-engineer a number that feels right. Unfortunately, property values don&apos;t work that way.
          </p>
          <p>
            A property isn&apos;t worth what a seller hopes to get for it. It isn&apos;t worth what a neighbor believes it should be worth. And it certainly isn&apos;t worth whatever number happens to appear on a property portal. A property is worth what the market is willing to pay under current conditions. That distinction sounds obvious, yet it&apos;s responsible for a huge percentage of failed transactions.
          </p>
          <p>
            Every year, countless properties enter the market with unrealistic expectations attached to them. Some sit online for months while the owner waits for the &ldquo;right buyer.&rdquo; Others eventually sell, but only after multiple price reductions, lost momentum and unnecessary frustration. What&apos;s interesting is that the opposite problem exists too. Some owners significantly underestimate the value of what they have.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-12">
          {metrics.map((item) => (
            <div key={item.title} className="p-6 bg-[#F8F8F8]">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            My goal isn&apos;t to give you the highest possible valuation. It&apos;s to give you the most useful one. Because an inflated number might feel good for five minutes, but a realistic number can save months of wasted time and help you make significantly better decisions.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;The goal isn&apos;t to tell you what you want to hear. The goal is to help you understand your options before making an important decision.&rdquo;
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Get an Honest Valuation</h2>
          <p className="text-gray-600 mb-6">
            Whether you&apos;re planning to sell immediately, considering a future move, or simply curious about where your property stands in today&apos;s market, an honest conversation is usually the best place to start.
          </p>
          <Link href="/en/contact" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
