import Link from "next/link";

export const metadata = {
  title: "How I Work",
  description: "One thing I notice quickly is that most people aren't looking for an agent. They're looking for certainty.",
};

export default function HowIWorkEN() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">Process</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white">How I Work</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10 text-gray-600 text-lg leading-relaxed">
        <p>
          One of the things I notice very quickly when speaking with people who are buying or selling property is that most of them aren&apos;t actually looking for an agent. That sounds strange at first, but it&apos;s true. People think they&apos;re looking for an agent, but what they&apos;re really looking for is certainty. They want someone who will help them make a good decision. Someone who will tell them what they&apos;re not seeing.
        </p>
        <p>
          That&apos;s why my approach may look a little different from what you&apos;re used to. I don&apos;t like to improvise. I don&apos;t like to guess. And I don&apos;t like making decisions based on instinct when there&apos;s data available that can make the decision better.
        </p>

        <div className="border-l-4 border-[#D4AF37] pl-8 my-12">
          <p className="font-playfair text-2xl text-[#1A1A1A] font-medium">
            Working together almost never begins with a property. It begins with a conversation.
          </p>
        </div>

        <p>
          I want to understand what you&apos;re trying to achieve. Because it&apos;s not the same thing to sell a family home you&apos;ve lived in for twenty years, an investment apartment, or a piece of land you no longer need. And it&apos;s not the same to buy a first apartment, find more space for a growing family, or invest capital you&apos;ve been building for years.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          {[
            { num: "01", title: "Understanding Your Situation", desc: "What are you selling or looking for? Why? How important is speed versus maximizing value? What risks do you want to avoid? Only once I understand the situation does the analysis begin." },
            { num: "02", title: "Market Analysis", desc: "I'm not only interested in what's listed on portals. I want to know what's actually happening — how long similar properties take to sell, what buyer interest looks like, and where your property has a competitive advantage." },
            { num: "03", title: "Strategy & Presentation", desc: "Based on the analysis we define positioning. Then comes presentation: photography, description, communication. Buyers make decisions in seconds — the first impression has an enormous impact on the final outcome." },
            { num: "04", title: "Negotiation & Closing", desc: "I manage buyer communication, organize viewings, qualify serious inquiries, and negotiate. This is usually where the difference between an average and an excellent outcome is decided." },
          ].map((step) => (
            <div key={step.num} className="p-8 bg-[#F8F8F8]">
              <div className="font-playfair text-5xl font-bold text-[#D4AF37]/20 mb-3">{step.num}</div>
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <p>
          This is the part of the work most people never see. They see photos. They see a listing. They see a price table. But they don&apos;t see the hours spent on analysis, conversations, market research, communicating with potential buyers, and preparing for negotiation. And that&apos;s usually where value is created.
        </p>
        <p>
          Throughout the entire process, I believe in one thing more than any sales technique — transparency. If I think something isn&apos;t a good idea, I&apos;ll tell you. If I think expectations are too high, I&apos;ll explain why. If I see an opportunity worth pursuing, I&apos;ll tell you that too.
        </p>
        <p className="font-medium text-[#1A1A1A]">
          At the end of the day, I don&apos;t want people to remember me as the person who sold them a property. I want them to remember me as the person who helped them make a good decision.
        </p>

        <div className="pt-4">
          <Link
            href="/en/contact"
            className="inline-flex items-center px-10 py-4 bg-[#D4AF37] text-white font-semibold text-base hover:bg-[#B8972E] transition-colors"
          >
            Let&apos;s Start With a Conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
