import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Work With Me",
  description: "The honest answer is that you probably shouldn't work with me simply because you're looking for a real estate agent.",
};

const pillars = [
  {
    title: "Experience Beyond Real Estate",
    desc: "That experience fundamentally shaped the way I approach property transactions today. When I look at a property, I don't just see square meters, photographs and a price tag. I immediately start thinking about positioning, market demand, buyer motivation, competitive alternatives, negotiation leverage and long-term value.",
  },
  {
    title: "Directness & Honesty",
    desc: "If you're looking for someone who will challenge assumptions, identify blind spots, communicate honestly and help you make better decisions throughout the process, then there's a good chance we'll work well together. I won't tell you what you want to hear if it could cost you money later.",
  },
  {
    title: "Strategic Thinking",
    desc: "Most people assume buying or selling property is primarily a real estate process. I see it as a strategic decision-making process that happens to involve real estate. The distinction matters enormously in practice.",
  },
];

export default function WhyMePage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Why Me</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            If You&apos;re Looking for Someone to Tell You What You Want to Hear, There Are Plenty of Options.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            The honest answer is that you probably shouldn&apos;t work with me simply because you&apos;re looking for a real estate agent. There are thousands of agents. Most of them can list a property, organize viewings, upload photos to property portals, answer inquiries and guide a transaction from one stage to another. Those things matter, but they are also the minimum expectation of the profession.
          </p>
          <p>
            What matters far more is how someone thinks when things stop going according to plan — because sooner or later every property transaction becomes less about the property itself and more about people, expectations, emotions, negotiations and decision making under uncertainty.
          </p>
          <p>
            My background isn&apos;t rooted exclusively in real estate. For years I&apos;ve worked across sales, business development, operations, digital products, project management and growth-focused environments where success depended on understanding how people make decisions, how businesses create value and how complex situations can be simplified into clear, actionable next steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 my-12">
          {pillars.map((item) => (
            <div key={item.title} className="p-6 bg-[#F8F8F8]">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            This approach isn&apos;t always the fastest. It isn&apos;t always the most exciting. It certainly doesn&apos;t generate the dramatic promises that dominate much of the real estate industry. What it does generate is clarity. And clarity is incredibly valuable when you&apos;re making decisions involving hundreds of thousands of euros.
          </p>
        </div>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            &ldquo;I don&apos;t measure success by the number of transactions. I measure success by the quality of decisions my clients make.&rdquo;
          </p>
        </div>

        <div className="bg-[#F8F8F8] p-10 mt-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">Let&apos;s See If We&apos;re a Good Fit</h2>
          <p className="text-gray-600 mb-6">
            One conversation is usually enough to know whether working together makes sense. No pressure, no pitch.
          </p>
          <Link href="/en/contact" className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
