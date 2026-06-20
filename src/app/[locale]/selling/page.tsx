import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Selling Your Property",
  description: "Successful sales don't begin with buyers. They begin with strategy.",
};

export default function SellingPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Selling</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Successful Sales Don&apos;t Begin With Buyers. They Begin With Strategy.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Most people start the selling process the same way. They open a property portal, search for similar listings in their area, compare asking prices, and try to estimate what their property might be worth. That&apos;s perfectly normal. The problem is that real estate markets rarely work that neatly.
          </p>
          <p>
            Two nearly identical properties can produce completely different outcomes. One may sell within weeks. The other may sit on the market for months. One may attract multiple serious buyers. The other may struggle to generate meaningful interest. And more often than not, the difference isn&apos;t the property itself. It&apos;s the strategy behind it.
          </p>
          <p>
            Many property owners believe that pricing is the most important part of the process. Pricing matters. But it&apos;s only one piece of a much larger equation. Positioning matters. Presentation matters. Marketing matters. Buyer psychology matters. Negotiation matters. Communication matters. The way a property enters the market often has a larger impact on the final outcome than people realize.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;We don&apos;t start with an advertisement. We start with understanding your situation.&rdquo;
          </p>
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            Why are you selling? How quickly do you need to move? What would success look like for you? What concerns do you have about the process? Once those answers are clear, we can start building a strategy around your objectives rather than relying on assumptions.
          </p>
          <p>
            From there we analyze the market, evaluate competing properties, identify potential buyer profiles, and determine how your property should be positioned to stand out for the right reasons. Only then do we focus on presentation. Professional photography. Clear messaging. Strong positioning. A compelling story. Because buyers make emotional decisions long before they justify them with logic.
          </p>
          <p>
            Throughout the process, you&apos;ll receive honest feedback, realistic expectations, and clear communication. No inflated promises. No artificial urgency. No unrealistic valuations designed to win your business. Just a strategy designed to help you achieve the best possible outcome based on market reality.
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Ready to Talk About Your Property?</h2>
          <p className="text-gray-600 mb-6">The first step isn&apos;t listing your property. The first step is a conversation.</p>
          <Link href="/en/contact" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
