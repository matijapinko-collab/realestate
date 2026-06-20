import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buying a Property",
  description: "Buying property shouldn't be about chasing listings. It should be about finding the right opportunity.",
};

export default function BuyingPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Buying</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Buying a Property Sounds Simple Until You Actually Start.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            You open a property portal, set a budget, select a location, browse listings, schedule viewings, and expect the right property to appear. In reality, that&apos;s usually when the confusion begins. Properties that look incredible online often feel completely different in person. Some listings are already gone. Some sellers aren&apos;t truly motivated. Some asking prices have very little connection to market reality.
          </p>
          <p>
            And after weeks or months of searching, many buyers find themselves stuck between uncertainty and decision fatigue. The challenge isn&apos;t finding properties. The challenge is knowing which opportunities are actually worth pursuing.
          </p>
          <p>
            That&apos;s why my approach doesn&apos;t start with square meters, bedrooms, or budgets. It starts with understanding what you&apos;re trying to accomplish. Are you buying your first home? Looking for more space for your family? Searching for an investment property? Planning a future rental strategy? The answers matter because different goals require completely different strategies.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;Too many buyers fall in love with individual features while overlooking the factors that will matter years later.&rdquo;
          </p>
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            My role isn&apos;t to convince you to buy a property. My role is to help you evaluate opportunities objectively, identify risks, understand market realities, and make decisions that align with your goals. Sometimes that means moving forward confidently. Sometimes it means negotiating aggressively. And sometimes it means walking away. All three outcomes can be the right decision depending on the circumstances.
          </p>
          <p>
            Because buying property shouldn&apos;t be about chasing listings. It should be about finding the right opportunity at the right time for the right reasons.
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Tell Me What You&apos;re Looking For</h2>
          <p className="text-gray-600 mb-6">
            Whether you&apos;re just starting your search or you&apos;ve been looking for months and feel like you&apos;re going in circles, let&apos;s have a focused conversation about what actually makes sense for your situation.
          </p>
          <Link href="/en/contact" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
